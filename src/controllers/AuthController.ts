import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';
import { ErrorHandler } from '../utils/errors';
import { jsonResponse } from '../utils/response';

class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      throw new ErrorHandler(400, 'Invalid username or password');
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      next(error);
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      throw new ErrorHandler(400, 'Invalid username or password');
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    //Send the jwt in the response
    res.status(200).json(
      jsonResponse({
        token,
        user: { ...user, id: undefined, password: undefined },
      }),
    );
  };

  static changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      throw new ErrorHandler(400, 'Old password and new password are required');
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      next(error);
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      throw new ErrorHandler(401, 'Wrong old password');
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new ErrorHandler(401, 'User validation failed', errors);
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).json(
      jsonResponse(
        {
          ...user,
          id: undefined,
          password: undefined,
        },
        204,
      ),
    );
  };
}
export default AuthController;
