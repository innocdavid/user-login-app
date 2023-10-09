import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import morgan from 'morgan';

import dbConnection from './config/db.js';
import userRouter from './routers/userRouter.js';

const app = express();
dotenv.config();
dbConnection();

//MIDDLEWARES
app.use(morgan('tiny'));
app.use(express.json());

//ROUTES
app.use('/api/v1/', userRouter);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`server listening at http://${HOST}:${PORT}`.bgYellow);
    });
}


export default app;