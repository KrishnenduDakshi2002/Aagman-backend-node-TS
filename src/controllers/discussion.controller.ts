import { Response, Request } from "express";
import mongoose from "mongoose";

import { messageCustom, messageError } from "../helpers/message";
import {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
} from "../helpers/messageTypes";

//models
import {
  DiscussionModel,
  AnswerModel,
  CommentModel,
} from "../models/discussion.model";

export async function getAllQuestions(req: Request, res: Response) {
  try {
    const questions = await DiscussionModel.find({}).populate([
      { path: "author", select: "userName" },
    ]);
    messageCustom(res, OK, "OK", questions);
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
export async function postAnswer(req: Request, res: Response) {
    try {
      const { UserId, questionId, ...body } = req.body;
      const _id = new mongoose.Types.ObjectId(UserId);
      const Question_id = new mongoose.Types.ObjectId(questionId);
      const answer = await new AnswerModel({ ...body, author: _id }).save();
      await DiscussionModel.findByIdAndUpdate(Question_id, {
        $addToSet: { answers: answer._id },
      });
      messageCustom(res, CREATED, "answer posted", { answerId: answer._id });
    } catch (error) {
      messageError(res, SERVER_ERROR, "server error", error);
    }
  }
  
export async function getAllAnswers(req: Request, res: Response) {
  try {
    const {questionId,...body} = req.body;
    const Question_id = new mongoose.Types.ObjectId(questionId);
    const answers = await DiscussionModel.findById(Question_id).populate({path:'answers'}).select('answers')
    messageCustom(res,OK,"OK",answers);
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
export async function createQuestion(req: Request, res: Response) {
  try {
    const { UserId, ...body } = req.body;
    const _id = new mongoose.Types.ObjectId(UserId);
    const question = await new DiscussionModel({ ...body, author: _id }).save();
    messageCustom(res, CREATED, "question created", { _id: question._id });
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
export async function deleteQuestion(req: Request, res: Response) {
  try {
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
