import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { jsonResponse } from "../utils/response";
import { ErrorHandler } from "../utils/errors";
import { json } from "body-parser";

class UserController {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get users from database
      const userRepository = getRepository(User);
      const users = await userRepository.find({
        select: ["id", "username", "role"] //We don't want to send the passwords on response
      });
      //Send the users object
      res.status(200).json(jsonResponse(users));
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
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"] //We don't want to send the password on response
      });
      res.status(200).json(jsonResponse(user));
    } catch (error) {
      error.statusCode = "404";
      next(error);
    }
  };

  static newUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, email, role } = req.body;
      //Get the user from database
      const userRepository = getRepository(User);
      const user = new User();
      user.username = username;
      user.password = password;
      user.email = email;
      user.role = role;

      const errors = await validate(user);
      if (errors.length > 0) {
        return next(new ErrorHandler(400, "User validation failed", errors));
      }
      //Hash the new password and save
      user.hashPassword();
      userRepository.save(user);
      res.json(
        jsonResponse(
          {
            ...user,
            id: undefined,
            password: undefined
          },
          201
        )
      );
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  };

  static editUser = async (req: Request, res: Response, next: NextFunction) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { username, role } = req.body;

    //Try to find user on database
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      return next(new ErrorHandler(404, "User not found"));
    }

    //Validate the new values on model
    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      next(new ErrorHandler(400, "User validation failed", errors));
      return;
    }

    //Try to save, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      next(new ErrorHandler(409, "username already in use"));
      return;
    }
    res
      .status(202)
      .json(jsonResponse({ ...user, id: undefined, password: undefined }, 202));
  };

  static deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      next(new ErrorHandler(404, "User not found"));
      return;
    }

    userRepository.delete(id);

    res.status(202).json(
      jsonResponse(
        {
          ...user
        },
        202
      )
    );
  };
}

export default UserController;
