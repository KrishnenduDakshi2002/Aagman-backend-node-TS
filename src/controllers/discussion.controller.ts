import { Response,Request } from "express";

import { messageCustom, messageError } from "../helpers/message";
import {
  OK,
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
} from "../helpers/messageTypes";

import EventModel from '../models/event.model'