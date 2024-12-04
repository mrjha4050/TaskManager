import React, { useState } from 'react';
import { auth, provider } from '../firebase';   
import { signInWithPopup } from 'firebase/auth';  
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const email = user.email;

      setUser(user);

      onLogin(user);
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };


  const handleCreateRoom = () => {
    console.log("User clicked Create Room");
  };

  const handleJoinRoom = () => {
    console.log("User clicked Join Room");
  };

  return (
    <div>
      {!user ? (
        <div>
          <h1>Login with Gmail</h1>
          <button onClick={handleLogin}>Login with Google</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleCreateRoom}>Create a Room</button>
          <button onClick={handleJoinRoom}>Join a Room</button>
        </div>
      )}
    </div>
  );
};

export default Login;