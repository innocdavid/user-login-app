import express from 'express';

const userRouter = express.Router();

import { signup } from '../controllers/userController.js';

userRouter.post('/signup', signup);


export default userRouter;