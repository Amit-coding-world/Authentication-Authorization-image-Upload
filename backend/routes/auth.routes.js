import express, {Router} from 'express';
import { login, logout, signUp,getUserData } from '../controllers/auth.controllers.js';
import { upload } from '../middlewares/multer.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const authRouter= Router()

authRouter.post('/signup',upload.single("profileImage"),signUp)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.get('/getuserdata',checkAuth,getUserData)


export default authRouter;