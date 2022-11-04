import express from 'express';
import { createQuestion, getAllAnswers, getAllQuestions, postAnswer } from '../controllers/discussion.controller';
import { createEvent, deleteEvent, getAllEvents } from '../controllers/event.controller';
import { login, signUp, test, verifyToken } from '../controllers/user.controller';
import SanitizerMiddleware from '../middlewares/sanitizer.middleware';
import UserAuthentication from '../middlewares/verifyToken.middleware';


const router = express.Router();

//user routes
router.get('/api/v1/user/verifyToken',[UserAuthentication],verifyToken);
router.post('/api/v1/user/login',login);
router.post('/api/v1/user/signup',[SanitizerMiddleware],signUp);
router.post('/api/test',test);

//event routes
router.post('/api/v1/event/post',[SanitizerMiddleware,UserAuthentication],createEvent);
router.get('/api/v1/event/getAllEvents',getAllEvents);
router.delete('/api/v1/event/delete',[UserAuthentication],deleteEvent);

//discussion routes
router.post('/api/v1/discussion/question/post',[UserAuthentication],createQuestion);
router.get('/api/v1/discussion/question/getAll',getAllQuestions);
router.post('/api/v1/discussion/answer/getAll',getAllAnswers);
router.post('/api/v1/discussion/answer/post',[UserAuthentication,SanitizerMiddleware],postAnswer);
export default router;