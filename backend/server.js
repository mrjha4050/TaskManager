const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Routes
const roomRoutes = require('./routes/rooms');
const taskRoutes = require('./routes/tasks');

app.use('/api/rooms', roomRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));