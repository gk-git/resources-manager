import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { Post } from "../entity/resources/Post";
import { jsonResponse } from "../utils/response";
import { ErrorHandler } from "../utils/errors";
import { json } from "body-parser";
import { slugify } from "../utils";

class UserController {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get users from database
      const postRepository = getRepository(Post);
      const posts = await postRepository.find();
      //Send the users object
      res.status(200).json(jsonResponse(posts));
    } catch (err) {
      next(err);
    }
  };

  static getOneById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    //Get the user from database
    const postRepository = getRepository(Post);
    try {
      const post = await postRepository.findOneOrFail(id);
      res.status(200).json(jsonResponse(post));
    } catch (error) {
      next(new ErrorHandler(404, `No post with id: '${id}`));
    }
  };

  static newPost = async (req: Request, res: Response, next: NextFunction) => {
    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId;
    //Get parameters from the body
    let { title, description, url } = req.body;
    const slug = slugify(title);
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(userId);
    let post = new Post();
    post.title = title;
    post.slug = slug;
    post.description = description;
    post.url = url;
    post.user = user;

    //Validate if the parameters are ok
    const errors = await validate(post);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "Post validation failed", errors));
      return;
    }

    //Try to save. If fails, the username is already in use
    const postRepository = getRepository(Post);
    try {
      await postRepository.save(post);
    } catch (e) {
      throw new ErrorHandler(409, "username already in use");
    }

    //If all ok, send 201 response
    res.status(201).json(jsonResponse(post, 201));
  };

  static editPost = async (req: Request, res: Response, next: NextFunction) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId;
    //Get parameters from the body
    let { title, description, url } = req.body;

    //Try to find user on database
    const postRepository = getRepository(Post);
    let post;
    try {
      post = await postRepository.findOneOrFail(id);
      post.title = title || post.title;
      if (title) {
        post.slug = slugify(title);
      }
      post.description = description || post.description;
      post.url = url || post.url;
    } catch (error) {
      //If not found, send a 404 response
      next(new ErrorHandler(404, "Post not found"));
      return;
    }
    //Validate the new values on model

    const errors = await validate(post);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "Post validation failed", errors));
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await postRepository.save(post);
    } catch (e) {
      next(new ErrorHandler(409, "username already in use"));
    }
    //After all send a 204 (no content, but accepted) response
    res.status(202).json(jsonResponse({ ...post }, 202));
  };

  static deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get the ID from the url
    const id = req.params.id;

    const postRepository = getRepository(Post);
    let post: Post;
    try {
      post = await postRepository.findOneOrFail(id);
    } catch (error) {
      next(new ErrorHandler(404, "User not found " + error.message));
    }
    postRepository.delete(id);

    res.status(202).json(jsonResponse({ ...post }, 202));
  };
}

export default UserController;
