import joi from "joi";

export default function UserValidation(data : Object){
    const schema = joi.object({
        userName: joi.string(),
        email : joi.string().email().required(),
        password : joi.string().required()
    });

    return schema.validate(data);
}