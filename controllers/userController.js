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

const getUser = expressAsyncHandler(async (req, res) => {

    const { id } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).json({ message: 'Invalid user id format' });
        
        const user = await User.findById(id).select("-__v");
      
        if (!user)
            return res.status(404).json({ message: 'User not found' });
      
        res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export { signup, getUser };