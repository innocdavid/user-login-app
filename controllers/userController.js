// import modules
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';
import expressAsyncHandler from 'express-async-handler';
import colors from 'colors';

import User from '../models/userModel.js';
import generateToken from '../middleware/generateToken.js';

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
        res.status(201).json({ id: user.id, message: 'User created successfully' });
    } catch (err) {
        console.error(err.bgRed);
        res.status(500).json({ error: err.message });
    }
});

const login = expressAsyncHandler(async(req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found'});
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }
        
        //jwt 
        const token = generateToken(existingUser.id);

        //cookie
        res.cookie(String(existingUser.id), token, 
            {
                path: '/',
                expires: new Date(Date.now() + 1000 * 30),
                httpOnly: true,
                sameSite: 'lax'
            })

        res.status(201).json({ 
            token,
            message: 'User login successful' });
    } catch (err) {
        console.error(err.bgRed);
        res.status(500).json({ error: err.message });
    }
});

const logout = expressAsyncHandler(async(req, res) => {

    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.status(404).json({ message: 'User not found'});
    }

    res.cookie(existingUser.id, '', {
        expires: new Date(0),
        httpOnly: true,
    });

    res.status(200).json({ message: 'Logout successful' });
})

const getUser = expressAsyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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

const updateUser = expressAsyncHandler(async (req, res) => {
 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user id format' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;

        await user.save();
        res.status(201).json({ id: user.id, message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

const deleteUser = expressAsyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user id format' });
        }

        const user = await User.findByIdAndRemove(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});



export { signup, getUser, updateUser, deleteUser, login, logout };