import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import morgan from 'morgan';

import dbConnection from './config/db.js';

const app = express();
dotenv.config();
dbConnection();

//MIDDLEWARES
app.use(morgan('tiny'));


const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`server listening at http://${HOST}:${PORT}`.bgYellow);
});