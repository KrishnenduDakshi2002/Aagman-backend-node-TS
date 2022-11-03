import express from 'express';
import { createEvent, deleteEvent, getAllEvents } from '../controllers/event.controller';
import { login, signUp, test } from '../controllers/user.controller';
import SanitizerMiddleware from '../middlewares/sanitizer.middleware';
import UserAuthentication from '../middlewares/verifyToken.middleware';


const router = express.Router();

//user routes
router.post('/api/v1/user/login',login);
router.post('/api/v1/user/signup',[SanitizerMiddleware],signUp);
router.post('/api/test',test);

//event routes
router.post('/api/v1/event/post',[SanitizerMiddleware],createEvent);
router.get('/api/v1/event/getAllEvents',getAllEvents);
router.delete('/api/v1/event/delete',deleteEvent);

export default router;