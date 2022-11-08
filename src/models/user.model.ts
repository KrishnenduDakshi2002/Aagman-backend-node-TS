
import mongoose, {Schema, model, ObjectId} from "mongoose";

export interface UserInterface{
    userName : String;
    email: string;
    password : string;
    questions: Array<ObjectId>;
    answers : Array<ObjectId>;
    createdAt : string;
    updatedAt : string;
}

const UserSchema = new Schema({
    userName : {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
    },
    password : {
        type: String,
        required : true,
    },
    questions:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Discussion'
        }
    ],
    answers :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'DiscussionAnswer'
        }
    ]

},
{
    timestamps : true
})

const User = model<UserInterface>('User',UserSchema);
export default User;