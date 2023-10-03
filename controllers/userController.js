// import modules
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import expressAsyncHandler from 'express-async-handler';
import colors from 'colors';

import User from '../models/userModel.js';

const signup = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({ firstName, lastName, email, password:hashedPassword });

        await user.save();
        res.status(201).json({ id: user._id, message: 'User created successfully' });
    } catch (err) {
        console.error(err.bgRed);
        res.status(500).json({ error: err.message });
    }
});

export { signup, };