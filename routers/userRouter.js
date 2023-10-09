import express from 'express';

import verifyToken from '../middleware/verifyToken.js';
import refreshToken from '../middleware/refreshToken.js';
import validateObjectId from '../middleware/validateObjectId.js';

const userRouter = express.Router();

import { signup , getUser, updateUser, deleteUser, login } from '../controllers/userController.js';

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/user/:id', verifyToken, validateObjectId, getUser);
userRouter.put('/user/:id', verifyToken, validateObjectId, updateUser);
userRouter.delete('/user/:id', verifyToken, validateObjectId, deleteUser);
userRouter.get('/refresh', refreshToken, verifyToken, getUser);

export default userRouter;