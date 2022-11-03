import sanitizeHtml from 'sanitize-html';
import { Request, Response ,NextFunction } from 'express';
import { messageError } from '../helpers/message';
import { BAD_REQUEST } from '../helpers/messageTypes';

// This middleware will prevent from XSS attack (cross site scripting)

// npm reference  --> https://www.npmjs.com/package/sanitize-html

const sanitizer = {
    allowedTags: [],
    allowedAttributes: {},
    allowedIframeHostnames: [],
};
/* ------------ Html sanitizer Middleware ----------- */


export default function SanitizerMiddleware(req : Request, res : Response, next : NextFunction){
        let status = 0;
        for (let [key, value ] of Object.entries<string>(req.body)) {  // string in the < > defines the type of value
            if (value !== sanitizeHtml(value, sanitizer)) {
                // TODO: handle error
                if(typeof value !== 'object'){
                    messageError(res,BAD_REQUEST,"invalid inputs",{"error": key + ' must not include HTML!'})
                    status = -1;
                }
            }
        }
        if(status == 0) next();
    };

