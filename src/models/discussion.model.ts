
import mongoose, { Schema,model,ObjectId } from "mongoose";



export interface CommentInterface {
    answer : String;
    author : ObjectId;
    date : String
}
export interface AnswerInterface {
    answer : String;
    author : ObjectId;
    date : String;
    comments : Array<CommentInterface>
}

export interface DiscussionInterface {
    question : String;
    description : String;
    author : ObjectId;
    postDate : String;
    likes : Number;
    tags : Array<String>;
    answers : Array<AnswerInterface>;
}

const DiscussionSchema = new Schema({
    question : {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    likes : Number,
    tags : Array,
    answers : [
        {
            type : Schema.Types.ObjectId,
            ref : 'DiscussionAnswer'
        }
    ]
},{
    timestamps: true
})

const AnswerSchema = new Schema({
    answer :{
        type: String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : [
        {
            type : Schema.Types.ObjectId,
            ref : 'DiscussionComment'
        }
    ]
},{
    timestamps: true
})

const CommentSchema = new Schema({
    answer :{
        type: String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    date : String
},{
    timestamps: true
})

const DiscussionModel = model<DiscussionInterface>('Discussion',DiscussionSchema);
const AnswerModel = model<AnswerInterface>('DiscussionAnswer',AnswerSchema);
const CommentModel = model<CommentInterface>('DiscussionComment',CommentSchema);

export {
    DiscussionModel,
    AnswerModel,
    CommentModel
}