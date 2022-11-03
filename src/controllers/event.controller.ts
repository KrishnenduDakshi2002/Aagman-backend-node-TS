import { Request, Response } from "express";

import { messageCustom, messageError } from "../helpers/message";
import {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
} from "../helpers/messageTypes";

import EventModel from '../models/event.model'


export async function createEvent(req:Request,res: Response) {
    try {
        const event = await new EventModel(req.body).save();
        messageCustom(res,CREATED,"event created",{_id: event._id, eventName : event.eventName});
    } catch (error) {
        return messageError(res,SERVER_ERROR,"server error",error);
    }
}

export async function getAllEvents(req:Request,res:Response) {
    try {
        const events = await EventModel.find({});
        messageCustom(res,OK,"OK",events);
    } catch (error) {
        return messageError(res,SERVER_ERROR,"server error",error);
    }
}

export async function deleteEvent(req:Request,res: Response) {
    try {
        const response = await EventModel.deleteOne({_id:req.body._id});
        messageCustom(res,OK,"OK",response);
    } catch (error) {
        return messageError(res,SERVER_ERROR,"server error",error);
    }
}