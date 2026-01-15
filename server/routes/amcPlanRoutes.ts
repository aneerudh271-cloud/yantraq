import express from 'express';
import AMCPlan from '../models/AMCPlan.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all active plans (Public)
router.get('/', async (req, res) => {
    try {
        const plans = await AMCPlan.find({ isActive: true }).sort({ price: 1 });
        res.json(plans);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get all plans including inactive (Admin)
router.get('/all', protect, admin, async (req, res) => {
    try {
        // Sort by 'popular' first (descending), then by price or creation
        const plans = await AMCPlan.find().sort({ createdAt: 1 });
        res.json(plans);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Create new plan (Admin)
router.post('/', protect, admin, async (req, res) => {
    try {
        const plan = new AMCPlan(req.body);
        const savedPlan = await plan.save();
        res.status(201).json(savedPlan);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Update plan (Admin)
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updatedPlan = await AMCPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(updatedPlan);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete plan (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const deletedPlan = await AMCPlan.findByIdAndDelete(req.params.id);
        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json({ message: 'Plan deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
