import jwt from 'jsonwebtoken';

export default function generateToken(userId) {
    //jwt 
    const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN,
        {expiresIn: '30s'});

    return token;
}