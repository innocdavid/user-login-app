import jwt from 'jsonwebtoken';
import colors from 'colors';

import generateToken from './generateToken.js'

export default async function refreshToken (req, res, next) {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split('=')[1];

    if (!prevToken) {
        return res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(
        String(prevToken), 
        process.env.JWT_TOKEN,
        (err, user) => {
            if (err) {
                console.error(err.bgRed);
                return res.status(403).json({ message: 'User authentication faild'})
            }

            res.clearCookie(`${user.id}`);
            res.cookies[`${user.id}`] = '';

            //generate tokn again
            //jwt 
            const token = generateToken(user.id);
           
            //cookie
            res.cookie(String(user.id), token, 
                {
                    path: '/',
                    expires: new Date(Date.now() + 1000 * 30),
                    httpOnly: true,
                    sameSite: 'lax'
                })

        })
    next();
}