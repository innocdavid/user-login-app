import jwt from 'jsonwebtoken';
import colors from 'colors';

export default async function verifyToken(req, res, next) {
    const cookies = req.headers.cookie;

    if (!cookies) return res.status(401).json({ message: 'cookie not found' });
   
    const token = cookies.split('=')[1];

    if (!token) {
        return res.status(404).json({ message: 'No user token found'});
    }

    jwt.verify(
        String(token),
        process.env.JWT_TOKEN,
        (err, user) => {
            if (err) {
                console.error(err.bgRed);
                return res.status(401).json({ message: 'Invalid user token' });
            }
        })

    next();
}