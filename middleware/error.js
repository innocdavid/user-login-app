import winston from 'winston';

// middlewares/error.js
export default function errorMiddleware(err, req, res, next) {
    return res.status(500).send({ message: err.message });
}
