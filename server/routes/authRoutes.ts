import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id: string, role: string) => {
    return jwt.sign({ userId: id, role }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id.toString(), user.role);

            // Cookie is optional but recommended
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.json({
                _id: user._id,
                email: user.email,
                role: user.role,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        res.status(500).json({ message });
    }
});

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
router.get('/users', protect as any, admin as any, async (req: any, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        res.status(500).json({ message });
    }
});

// @desc    Create a user
// @route   POST /api/auth/users
// @access  Private/Admin
router.post('/users', protect as any, admin as any, async (req: any, res) => {
    const { email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            email,
            password,
            role: role || 'user',
        });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        res.status(500).json({ message });
    }
});

export default router;
