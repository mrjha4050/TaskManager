// backened/routes/tasks.js 
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.post('/', async (req, res) => {
    const { roomId, title, description, status } = req.body;
    console.log('Creating task with:', req.body);

    if (!roomId || !title) {
        console.log('Validation failed: Missing room ID or title');
        return res.status(400).json({ message: 'Room ID and title are required.' });
    }

    try {
        const task = new Task({ roomId, title, description, status });
        const newTask = await task.save();
        console.log('Task created:', newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ message: 'Failed to create a new task', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
});

module.exports = router;