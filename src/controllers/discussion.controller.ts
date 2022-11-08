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
import User from "../models/user.model";

export async function getAllQuestions(req: Request, res: Response) {
  try {
    const page = +(req.query.page as string) - 1;
    const limit = +(req.query.limit as string);
    const questions = await DiscussionModel.find({})
      .sort({ createdAt: -1 })
      .populate([{ path: "author", select: "userName" }])
      .skip(page * limit)
      .limit(limit);
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
    await User.findByIdAndUpdate(_id,{$addToSet :  { answers : answer._id}})
    messageCustom(res, CREATED, "answer posted", { answerId: answer._id });
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function getAllAnswers(req: Request, res: Response) {
  try {
    const page = +(req.query.page as string)-1;
    const limit = +(req.query.limit as string);
    const { questionId, ...body } = req.body;
    const Question_id = new mongoose.Types.ObjectId(questionId);
    const answers = await DiscussionModel.findById(Question_id)
      .sort({'createdAt':-1})
      .skip(page * limit)
      .limit(limit)
      .populate({ path: "answers" })
      .select("answers");
    messageCustom(res, OK, "OK", answers);
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
export async function searchByTags(req: Request, res: Response) {
  try {
  const {tags} = req.body;
  const questions = await DiscussionModel.find({tags : {$in: tags}})
    messageCustom(res, OK, "OK",questions);
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
export async function createQuestion(req: Request, res: Response) {
  try {
    const { UserId, ...body } = req.body;
    const _id = new mongoose.Types.ObjectId(UserId);
    const question = await new DiscussionModel({ ...body, author: _id }).save();
    await User.findByIdAndUpdate(_id,{$addToSet :  { questions : question._id}})
    messageCustom(res, CREATED, "question created", { _id: question._id });
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}
export async function deleteQuestion(req: Request, res: Response) {
  try {
    const {UserId} = req.body;
    const questionId = new mongoose.Types.ObjectId(req.body.questionId);
    //deleting all answers within question
    const question = await DiscussionModel.findOne({_id: questionId});
    if(!question) messageCustom(res,BAD_REQUEST,"question not present",question);
    question?.answers.map(async answerId=>{
      // remove the answers from answers array in user
      await User.findOneAndUpdate({answers : {$in : [answerId]}},{$pull : {answers : {$in : [answerId]}}});
      // deleting answers
      await AnswerModel.findByIdAndDelete(answerId);
    })
    // // removing question from user
    const response = await User.findByIdAndUpdate(UserId,{$pull :{ questions : {$in:[questionId]}}})
    // // deleting the question
    const deleteResponse = await DiscussionModel.deleteOne({_id: question?._id})
    messageCustom(res,OK,'deleted',deleteResponse);
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function updateQuestion(req: Request, res: Response) {
  try {
    const {UserId} = req.body;
    const questionId = new mongoose.Types.ObjectId(req.body.questionId);
    const _id = new mongoose.Types.ObjectId(UserId);
    await DiscussionModel.findByIdAndUpdate(questionId,{
      question : req.body.question,
      description : req.body.description,
      tags : req.body.tags,
      author : _id
    })
    messageCustom(res,OK,"updated",{});
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}

export async function updateLike(req: Request, res: Response) {
  try {
    const questionId = new mongoose.Types.ObjectId(req.body.questionId);
    const question = await DiscussionModel.updateOne({_id: questionId},{$inc :{likes : +req.body.count}})
    messageCustom(res,OK,'updated',question);
  } catch (error) {
    messageError(res, SERVER_ERROR, "server error", error);
  }
}



export async function dataEntry(req:Request,res: Response) {
    try {
       const answerId = new mongoose.Types.ObjectId(req.body.answerId);
       const user = await User.findOneAndUpdate({answers : {$in : [answerId]}},{$pull : {answers : {$in : [answerId]}}});
       messageCustom(res,OK,'updated',user);
    } catch (error: any) {
      throw new Error(error);
    }
}