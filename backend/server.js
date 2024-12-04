const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/rooms', (req, res) => {
    res.json([
      { id: 1, name: 'Conference Room A', capacity: 10 },
      { id: 2, name: 'Meeting Room B', capacity: 5 },
    ]);
  });
  
  app.listen(5001, () => {
    console.log('Backend server is running on port 5001');
  });

mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Routes
const roomRoutes = require('./routes/rooms');
const taskRoutes = require('./routes/tasks');

app.use('/api/rooms', roomRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));