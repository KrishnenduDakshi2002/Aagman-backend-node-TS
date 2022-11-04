
import { Schema,model } from "mongoose";

export interface EventInterface {
    eventName : String;
    description : String;
    startTime : String;
    endTime : String;
    startDate : String;
    endDate : String;
    mode : String;
    type : String;
    organizers : Array<String>,
    eventLink : String;
    imageUri : String;
    participant : Number;
}

const EventSchema = new Schema({
    eventName : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    startTime : {
        type: String,
        required : true
    },
    endTime : {
        type: String,
    },
    startDate : {
        type: String,
        required : true
    },
    endDate : {
        type: String,
    },
    mode : {
        type: String,
        required : true
    },
    type : {
        type: String,
        required : true
    },
    organizers:{
        type : Array
    },
    imageUri : String,
    participant : Number
},{
    timestamps : true
})

export default model<EventInterface>('EventMode',EventSchema)