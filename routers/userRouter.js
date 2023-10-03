import express from 'express';

const userRouter = express.Router();

import { signup , getUser, updateUser } from '../controllers/userController.js';

userRouter.post('/signup', signup);
userRouter.get('/user/:id', getUser);
userRouter.put('/user/:id', updateUser);

export default userRouter;