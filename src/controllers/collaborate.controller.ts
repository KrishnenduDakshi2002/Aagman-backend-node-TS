import { Response,Request } from "express";
import mongoose from "mongoose";


import { messageCustom, messageError } from "../helpers/message";
import {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
} from "../helpers/messageTypes";
import CollaborateModel from "../models/collaborate.model";

export async function getAllCollabPosts(req:Request,res: Response) {
    try {
        const collabPosts = await CollaborateModel.find({}).populate({path: 'author',select: 'userName'})
        messageCustom(res,OK,'OK',collabPosts);
    } catch (error) {
        messageError(res,SERVER_ERROR,"server error",error);
    }
}

export async function createCollabPost(req:Request,res: Response) {
    try {
        const {UserId,...body} = req.body;
        const author = new mongoose.Types.ObjectId(UserId);
        const newCollab = await new CollaborateModel({...body,author: author}).save();
        messageCustom(res,CREATED,"post created",{collabPostId: newCollab._id})
    } catch (error) {
        messageError(res,SERVER_ERROR,"server error",error);
    }
}

export async function deleteCollabPost(req:Request,res: Response) {
    try {
        const {UserId,postId} = req.body;
        const post = new mongoose.Types.ObjectId(postId);
        const delRes = await CollaborateModel.deleteOne({_id: post});
        messageCustom(res,OK,"post deleted",delRes)
    } catch (error) {
        messageError(res,SERVER_ERROR,"server error",error);
    }
}