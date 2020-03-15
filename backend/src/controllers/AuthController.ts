import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {User} from "../entity/User";
import config from "../config/config";
import {ErrorHandler} from "../utils/errors";
import {jsonResponse} from "../utils/response";

class AuthController {
    static login = async (req: Request, res: Response, next: NextFunction) => {
        //Check if email and password are set
        let {email, password} = req.body;
        console.log(req.body)
        if (!(email && password)) {
            return next(new ErrorHandler(400, "Invalid email or password"));
        }

        //Get user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {email}});
        } catch (error) {
            return next(
                new ErrorHandler(
                    404,
                    `No User with the following email: '${email}'`
                )
            );
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return next(new ErrorHandler(400, "Invalid email or passwords"));
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            {userId: user.id, email: user.email},
            config.jwtSecret,
            {expiresIn: "1h"}
        );

        //Send the jwt in the response
        res.status(200).json(
            jsonResponse(
                {
                    token,
                    user: {...user, id: undefined, password: undefined}
                },
                200
            )
        );
    };

    static changePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const {oldPassword, newPassword} = req.body;
        if (!(oldPassword && newPassword)) {
            return next(
                new ErrorHandler(400, "Old password and new password are required")
            );
        }

        //Get user from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            return next(error);
        }

        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            return next(new ErrorHandler(401, "Wrong old password"));
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            return next(new ErrorHandler(401, "User validation failed", errors));
        }
        //Hash the new password and save
        user.hashPassword();
        await userRepository.save(user);

        res.json(
            jsonResponse(
                {
                    ...user,
                    id: undefined,
                    password: undefined
                },
                204
            )
        );
    };

    static authenticate = (req: Request, res: Response, next: NextFunction) => {
        //TODO: replace with getting variable from session
        // @ts-ignore
        res.status(202).json(jsonResponse({user: req.user}, 202))
    }
}

export default AuthController;
