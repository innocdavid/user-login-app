import express from 'express';

const userRouter = express.Router();

import { signup , getUser } from '../controllers/userController.js';

userRouter.post('/signup', signup);
userRouter.get('/user/:id', getUser);

export default userRouter;