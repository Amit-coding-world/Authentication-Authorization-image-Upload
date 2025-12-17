import express, {Router} from 'express';
import { login, logout, signUp } from '../controllers/auth.controllers.js';
import { upload } from '../middlewares/multer.js';

const authRouter= Router()

authRouter.post('/signup',upload.single("profileImage"),signUp)
authRouter.post('/login',login)
authRouter.post('/logout',logout)


export default authRouter;