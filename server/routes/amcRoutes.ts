import express from 'express';
import AMC from '../models/AMC.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all AMCs
router.get('/', protect, admin, async (req, res) => {
    try {
        const amcs = await AMC.find().sort({ createdAt: -1 });
        res.json(amcs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Create new AMC
router.post('/', protect, admin, async (req, res) => {
    try {
        const amc = new AMC(req.body);
        const savedAMC = await amc.save();
        res.status(201).json(savedAMC);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Update AMC
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updatedAMC = await AMC.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAMC) {
            return res.status(404).json({ message: 'AMC not found' });
        }
        res.json(updatedAMC);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete AMC
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const deletedAMC = await AMC.findByIdAndDelete(req.params.id);
        if (!deletedAMC) {
            return res.status(404).json({ message: 'AMC not found' });
        }
        res.json({ message: 'AMC deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
