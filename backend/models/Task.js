const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;