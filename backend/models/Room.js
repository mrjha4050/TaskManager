const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    createdBy: { type: String, required: true },  
    users: [{ type: String }], 
});

module.exports = mongoose.model('Room', roomSchema);