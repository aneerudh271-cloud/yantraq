import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';

interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');

            req.user = await User.findById(decoded.userId).select('-password');

            if (!req.user) {
                res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
                return;
            }

            next();
            return;
        } catch (error) {
            res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
            return;
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
        return;
    }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};
