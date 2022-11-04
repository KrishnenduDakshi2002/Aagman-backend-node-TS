
import jwt from 'jsonwebtoken';
import config from 'config';
import { Request, Response, NextFunction } from 'express';

// importing model
import User,{UserInterface} from '../models/user.model';
import mongoose from 'mongoose';
import { messageCustom, messageError } from '../helpers/message';
import { BAD_REQUEST, SERVER_ERROR } from '../helpers/messageTypes';

/* ------------ User auth Middleware ----------- */


interface JwtPayload {
    _id : string;
}

export default async function UserAuthentication(req: Request, res: Response, next: NextFunction) {
    try {
        const JWToken = req.headers.authorization?.split(" ")[1];

        if (typeof JWToken == 'undefined') {
            return messageCustom(res,BAD_REQUEST,'token not present',{});
        } else {
            // token is not found
            if (!JWToken) return messageCustom(res,BAD_REQUEST,'Token is not found',{});

            // Decoding the jwt
            const DecodedToken = jwt.verify(JWToken, config.get('TOKEN_SECRET')) as JwtPayload;

            // failed verification 
            if (!DecodedToken) return messageCustom(res,BAD_REQUEST,'Token invalid or expired',{});

            // finding user by id
            const user = await User.findById(new mongoose.Types.ObjectId(DecodedToken._id));
            if(!user) return messageCustom(res,BAD_REQUEST,"user doesn't exists",{});

            // Adding verified to req.body
            req.body.UserId = user._id;

            // calling next function
            next();
            return;
        }

    } catch (error: any) {
        return messageError(res,SERVER_ERROR,"server error",error);
    }
}