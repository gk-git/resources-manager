import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { jsonResponse } from "../utils/response";
import { ErrorHandler } from "../utils/errors";
import { slugify } from "../utils";
import { Category } from "../entity/discord/Category";

class CategoryController {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get users from database
      const categoryRepository = getRepository(Category);
      const categories = await categoryRepository.find();
      //Send the users object
      res.status(200).json(jsonResponse(categories));
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
    const categoryRepository = getRepository(Category);
    try {
      const category = await categoryRepository.findOneOrFail(id);
      res.status(200).json(jsonResponse(category));
    } catch (error) {
      next(new ErrorHandler(404, `No category with id: '${id}`));
    }
  };

  static newCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId;
    //Get parameters from the body
    let { name, description, url, parentCategoryId } = req.body;
    const slug = slugify(name);
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(userId);
    let category = new Category();
    category.name = name;
    category.slug = slug;
    category.description = description;

    //Validate if the parameters are ok
    const errors = await validate(category);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "Category validation failed", errors));
      return;
    }

    //Try to save. If fails, the username is already in use
    const categoryRepository = getRepository(Category);
    try {
      await categoryRepository.save(category);
    } catch (e) {
      throw new ErrorHandler(409, "username already in use");
    }

    //If all ok, send 201 response
    res.status(201).json(jsonResponse(category, 201));
  };

  static editCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get ID from JWT
    const userId = res.locals.jwtPayload.userId;
    //Get parameters from the body
    let { name, description, url } = req.body;

    //Try to find user on database
    const categoryRepository = getRepository(Category);
    let category;
    try {
      category = await categoryRepository.findOneOrFail(id);
      category.name = name || category.name;
      if (name) {
        category.slug = slugify(name);
      }
      category.description = description || category.description;
      category.url = url || category.url;
    } catch (error) {
      //If not found, send a 404 response
      next(new ErrorHandler(404, "Category not found"));
      return;
    }
    //Validate the new values on model

    const errors = await validate(category);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "Category validation failed", errors));
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await categoryRepository.save(category);
    } catch (e) {
      next(new ErrorHandler(409, "username already in use"));
    }
    //After all send a 204 (no content, but accepted) response
    res.status(202).json(jsonResponse({ ...category }, 202));
  };

  static deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get the ID from the url
    const id = req.params.id;

    const categoryRepository = getRepository(Category);
    let category: Category;
    try {
      category = await categoryRepository.findOneOrFail(id);
    } catch (error) {
      next(new ErrorHandler(404, "User not found " + error.message));
    }
    categoryRepository.delete(id);

    res.status(202).json(jsonResponse({ ...category }, 202));
  };
}

export default UserController;
