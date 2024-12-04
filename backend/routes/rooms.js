const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const code = Math.random().toString(36).substring(2, 8);  
  try {
    const newRoom = new Room({ name, code, users: [email] });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/join', async (req, res) => {
  const { code, email } = req.body;
  try {
    const room = await Room.findOne({ code });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (!room.users.includes(email)) room.users.push(email);
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;