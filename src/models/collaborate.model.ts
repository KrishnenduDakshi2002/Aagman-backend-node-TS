
import mongoose, {Schema, model} from "mongoose";

export interface CollaborateInterface{
    eventName : String;
    description: String;
    imageUri : String;
    skills : Array<String>;
    author : String;
    //social links
    whatsApp : String;
    linkedIn : String;
    github : String;
    email : String;

    createdAt : string;
    updatedAt : string;
}

const CollaborateSchema = new Schema({
    eventName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageUri : {
        type : String,
    },
    skills : {
        type : Array,
    },
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type : String,
        required : true
    },
    whatsApp: {
        type : String,
    },
    linkedIn: {
        type : String,
    },
    github: {
        type : String,
    }
},
{
    timestamps : true
})

const CollaborateModel = model<CollaborateInterface>('Collaborate',CollaborateSchema);
export default CollaborateModel;