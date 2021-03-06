import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import {User} from "../entity/User";

import config from "../config/config";
import {jsonResponse} from "../utils/response";
import {getRepository} from "typeorm";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = <string>req.headers["auth"];
    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).json(jsonResponse({}, 401));
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const {userId, username} = jwtPayload;
    const newToken = jwt.sign({userId, username}, config.jwtSecret, {
        expiresIn: "1h"
    });
    //Get the user from database
    const userRepository = getRepository(User);
    try {
        //TODO: Replace with session
        // @ts-ignore
        req.user = await userRepository.findOneOrFail(userId, {
            select: ["id", "username", "role"] //We don't want to send the password on response
        });
    } catch (error) {
        res.status(401).json(jsonResponse({}, 401));
        return;
    }
    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
};
