import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { Tag } from "../entity/resources/Tag";
import { jsonResponse } from "../utils/response";
import { ErrorHandler } from "../utils/errors";
import { json } from "body-parser";
import { slugify } from "../utils";

class TagController {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get users from database
      const tagRepository = getRepository(Tag);
      const tags = await tagRepository.find();
      //Send the users object
      res.status(200).json(jsonResponse(tags));
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
    const tagRepository = getRepository(Tag);
    try {
      const tag = await tagRepository.findOneOrFail(id);
      res.status(200).json(jsonResponse(tag));
    } catch (error) {
      next(new ErrorHandler(404, `No tag with id: '${id}`));
    }
  };

  static newTag = async (req: Request, res: Response, next: NextFunction) => {
    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId;
    //Get parameters from the body
    const { name, description } = req.body;
    const slug = slugify(name);
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(userId);
    let tag = new Tag();
    tag.name = name;
    tag.slug = slug;
    tag.description = description;
    tag.user = user;

    //Validate if the parameters are ok
    const errors = await validate(tag);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "Tag validation failed", errors));
      return;
    }

    //Try to save. If fails, the name is already in use
    const tagRepository = getRepository(Tag);
    try {
      await tagRepository.save(tag);
    } catch (e) {
      next(new ErrorHandler(409, e.message));
      return;
    }

    //If all ok, send 201 response
    res.status(201).json(jsonResponse(tag, 201));
  };

  static editTag = async (req: Request, res: Response, next: NextFunction) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get parameters from the body
    let { name, description } = req.body;

    //Try to find user on database
    const tagRepository = getRepository(Tag);
    let tag;
    try {
      tag = await tagRepository.findOneOrFail(id);
      tag.name = name || tag.name;
      if (name) {
        tag.slug = slugify(name);
      }
      tag.description = description || tag.description;
    } catch (error) {
      //If not found, send a 404 response
      next(new ErrorHandler(404, "Tag not found"));
      return;
    }
    //Validate the new values on model

    const errors = await validate(tag);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "Tag validation failed", errors));
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await tagRepository.save(tag);
    } catch (e) {
      next(new ErrorHandler(409, "username already in use"));
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(202).json(jsonResponse({ ...tag }, 202));
  };

  static deleteTag = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get the ID from the url
    const id = req.params.id;

    const tagRepository = getRepository(Tag);
    let tag: Tag;
    try {
      tag = await tagRepository.findOneOrFail(id);
    } catch (error) {
      next(new ErrorHandler(404, "Tag not found " + error.message));
      return;
    }
    tagRepository.delete(id);

    res.status(202).json(jsonResponse({ ...tag }, 202));
  };
}

export default TagController;
