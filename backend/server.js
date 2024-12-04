const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const Room = require('./models/Room');
const verifyToken = require('./authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

const roomRoutes = require('./routes/rooms');
const taskRoutes = require('./routes/tasks');
app.use('/api/rooms', roomRoutes);
app.use('/api/tasks', taskRoutes);


app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});
app.post('/authenticate', verifyToken, async (req, res) => {
  try {
    const { uid, email } = req.user; // Firebase user info
    res.status(200).json({ user: { uid, email } });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

app.post('/rooms', async (req, res) => {
  const { name, createdBy } = req.body;

  if (!name || !createdBy) {
    return res.status(400).json({ error: 'Room name and creator are required.' });
  }
  try {
    const newRoom = new Room({
      code: `ROOM_${Math.random().toString(36).substr(2, 6).toUpperCase()}`, // Generate random code
      createdBy,
      users: [],
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    if (error.code === 11000) {  
      res.status(400).json({ error: 'Room code must be unique.' });
    } else {
      res.status(500).json({ error: 'Failed to create room', details: error.message });
    }
  }
});

app.post('/rooms/join/:code', async (req, res) => {
  const { code } = req.params;
  const { username } = req.body;   
  console.log('Joining Room with:', { code, username });  

  try {
    const room = await Room.findOne({ code });
    console.log('Room found:', room);  
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.users.includes(username)) {
      return res.status(400).json({ error: 'User already in the room' });
    }

    room.users.push(username);
    await room.save();   

    console.log('Updated Room:', room);   

    res.json(room);   
  } catch (error) {
    console.error('Error while joining the room:', error);   
    res.status(500).json({ error: 'Failed to join room' });
  }
});


app.delete('/rooms/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(204).send();  
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 