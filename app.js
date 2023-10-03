import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'

const app = express();
dotenv.config();


const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`server listening at http://${HOST}:${PORT}`.bgYellow);
});