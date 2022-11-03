import express from 'express';
import { login, signUp, test } from '../controllers/user.controller';
import SanitizerMiddleware from '../middlewares/sanitizer.middleware';
import UserAuthentication from '../middlewares/verifyToken.middleware';


const router = express.Router();


router.post('/api/v1/user/login',login);
router.post('/api/v1/user/signup',[SanitizerMiddleware],signUp);
router.post('/api/test',test);

export default router;