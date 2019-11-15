import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { PendingPost } from "../entity/resources/PendingPost";
import { jsonResponse } from "../utils/response";
import { ErrorHandler } from "../utils/errors";
import { returnNullIfUndefined } from "../utils";

class PostController {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get users from database
      const pendingPostRepository = getRepository(PendingPost);
      const pendingPosts = await pendingPostRepository.find();
      //Send the users object
      res.status(200).json(jsonResponse(pendingPosts));
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
    const id: string = req.params.id;

    //Get the user from database
    const pendingPostRepository = getRepository(PendingPost);
    try {
      const pendingPost = await pendingPostRepository.findOneOrFail(id);
      res.status(200).json(jsonResponse(pendingPost));
    } catch (error) {
      next(new ErrorHandler(404, `No pending post with id: '${id}`));
      return;
    }
  };

  static newPendingPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get parameters from the body
    let { title, description, url } = req.body;
    title = returnNullIfUndefined(title);
    description = returnNullIfUndefined(description);

    const pendingPost = new PendingPost();
    pendingPost.title = title;
    pendingPost.description = description;
    pendingPost.url = url;

    //Validate if the parameters are ok
    const errors = await validate(pendingPost);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "Pending post validation failed", errors));
      return;
    }

    //Try to save. If fails, the username is already in use
    const pendingPostRepository = getRepository(PendingPost);
    try {
      await pendingPostRepository.save(pendingPost);
    } catch (e) {
      next(new ErrorHandler(409, "URL already in use"));
      return;
    }

    //If all ok, send 201 response
    res.status(201).json(jsonResponse(pendingPost, 201));
  };

  static editPendingPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get parameters from the body
    let { title, description, url } = req.body;

    //Try to find user on database
    const pendingPostRepository = getRepository(PendingPost);
    let pendingPost;
    try {
      pendingPost = await pendingPostRepository.findOneOrFail(id);
      pendingPost.title = title || pendingPost.title;
      pendingPost.description = description || pendingPost.description;
      pendingPost.url = url || pendingPost.url;
    } catch (error) {
      //If not found, send a 404 response
      next(new ErrorHandler(404, "Pending post not found"));
      return;
    }
    //Validate the new values on model

    const errors = await validate(pendingPost);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "Pending post validation failed", errors));
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await pendingPostRepository.save(pendingPost);
    } catch (e) {
      next(new ErrorHandler(409, "URL already in use"));
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(202).json(jsonResponse(pendingPost, 202));
  };

  static deletePendingPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get the ID from the url
    const id = req.params.id;

    const postRepository = getRepository(PendingPost);
    let pendingPost: PendingPost;
    try {
      pendingPost = await postRepository.findOneOrFail(id);
    } catch (error) {
      next(new ErrorHandler(404, "Post not found " + error.message));
      return;
    }
    postRepository.delete(id);

    res.status(202).json(jsonResponse(pendingPost, 202));
  };
}

export default PostController;
