import express from 'express';

const userRouter = express.Router();

import { signup , getUser, updateUser, deleteUser } from '../controllers/userController.js';

userRouter.post('/signup', signup);
userRouter.get('/user/:id', getUser);
userRouter.put('/user/:id', updateUser);
userRouter.delete('/user/:id', deleteUser);

export default userRouter;