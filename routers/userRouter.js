import express from 'express';

import verifyToken from '../middleware/verifyToken.js';
import refreshToken from '../middleware/refreshToken.js';

const userRouter = express.Router();

import { signup, login, logout } from '../controllers/userController.js';

userRouter.post('/user/signup', signup);
userRouter.post('/user/login', login);
userRouter.post('/user/logout', verifyToken, logout);
// userRouter.get('/user/:id', verifyToken, validateObjectId, getUser);
// userRouter.put('/user/:id', verifyToken, validateObjectId, updateUser);
// userRouter.delete('/user/:id', verifyToken, validateObjectId, deleteUser);
userRouter.get('/user/refresh', refreshToken, verifyToken);

export default userRouter;