import express from 'express';

import validateObjectId from '../middleware/validateObjectId.js';

const userRouter = express.Router();

import { signup , getUser, updateUser, deleteUser } from '../controllers/userController.js';

userRouter.post('/signup', signup);
userRouter.get('/user/:id', validateObjectId, getUser);
userRouter.put('/user/:id', validateObjectId, updateUser);
userRouter.delete('/user/:id', validateObjectId, deleteUser);

export default userRouter;