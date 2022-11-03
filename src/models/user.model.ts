
import mongoose,{Schema, model} from "mongoose";

export interface UserInterface{
    userName : String;
    email: string;
    password : string;
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
    }
},
{
    timestamps : true
})

const User = model<UserInterface>('User',UserSchema);
export default User;