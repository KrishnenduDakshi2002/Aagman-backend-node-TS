import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from 'bcryptjs';

import { messageCustom, messageError } from "../helpers/message";
import {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
} from "../helpers/messageTypes";

// model
import User from "../models/user.model";

//validation
import UserValidation from "../validations/user.validation";


export async function verifyToken(req:Request,res: Response) {
  try {
      if (req.body.UserId !== undefined){
        messageCustom(res,OK,"verified",{"status":"Authorized"});
      }
  } catch (error) {
    messageError(res,SERVER_ERROR,"server error",error);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { value, error } = UserValidation(req.body);
    if (error) {
      messageError(res, BAD_REQUEST, "invalid email or password", error);
      return;
    }

    const user = await User.findOne({ email: value.email });
    if (!user) {
      messageError(res, BAD_REQUEST, "user doesn't exists", {});
      return;
    }
    //verify password
    const validPass = await bcrypt.compare(req.body.password, user?.password);
    if (!validPass) {
      messageError(res, BAD_REQUEST, "invalid password", {});
      return;
    }

    const payload = {
      _id: user._id.valueOf(),
    };

    const authToken = jwt.sign(payload, config.get("TOKEN_SECRET"), {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, config.get("TOKEN_SECRET"), {
      expiresIn: "1y",
    });

    messageCustom(res, OK, "logged in", {
      authToken: authToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function signUp(req: Request, res: Response) {
  try {
    const { value, error } = UserValidation(req.body);
    if (error) {
      messageError(res, BAD_REQUEST, "invalid inputs", error);
      return;
    }

    // hashing password from request
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(value.password, salt);

    const newValue = {...value,password: hashPassword}
    await new User(newValue).save();
    messageCustom(res,CREATED,"user created",{});
  } catch (error) {
    return messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function test(req: Request, res: Response) {

  try {
    const email = req.body.email;

    // hashing password from request
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("fadsfas", salt);
    res.json(hashPassword);
  } catch (error) {
    res.send(error);
  }
}
