import React, { useState } from 'react';
import axios from 'axios';

const TestAPI = ({ user }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const baseURL = 'http://localhost:5001/rooms'; 

  const fetchRooms = async () => {
    try {
      const res = await axios.get(baseURL);
      setRooms(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch rooms.');
    }
  };

  const handleCreateRoom = async () => {
    if (!newRoomName) {
      setError('Please provide a room name.');
      return;
    }

    try {
      const res = await axios.post(baseURL, {
        name: newRoomName,
        createdBy: user.email,
      });
      setRooms([...rooms, res.data]);   
      setNewRoomName('');  
      setError(null);
    } catch (err) {
      setError('Failed to create room.');
    }
  };

  // Join room
  const handleJoinRoom = async () => {
    if (!roomCode) {
      setError('Please provide a room code.');
      return;
    }

    try {
      const token = await user.getIdToken();   
      console.log('Joining room with:', { roomCode, token, username: user.email });

      const res = await axios.post(`${baseURL}/join/${roomCode}`, {
        token: token,           
        username: user.email,   
      });

      setRooms([...rooms, res.data]);
      setRoomCode(''); 
      setError(null);     
    } catch (err) {
      console.error('Error while joining room:', err);   
      setError(err.response?.data?.error || 'Failed to join room.');  // Display error message
      setRoomCode('');  
    }
  };

  return (
    <div>
      <h1>Manage Rooms</h1>

      <div>
        <h3>Rooms List</h3>
        <button onClick={fetchRooms}>Fetch Rooms</button>
        <ul>
          {rooms.map((room) => (
            <li key={room._id}>
              {room.name} | Code: {room.code} | Created by: {room.createdBy}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Create a Room</h3>
        <input
          type="text"
          placeholder="Enter Room Name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>

      <div>
        <h3>Join a Room</h3>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TestAPI;