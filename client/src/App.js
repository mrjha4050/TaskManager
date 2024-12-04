import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import { AuthProvider } from './Context/AuthContext';
import TestAPI from './components/TestAPI';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);   

  const handleLogin = (userData) => {
    setUser(userData);   
  };

  const handleLogout = () => {
    setUser(null);  
  };

  return (
    <AuthProvider>   
      <Router>
        <div>
          {!user ? (
            <Login onLogin={handleLogin} />  // Show Login component if not logged in
          ) : (
            <div>
              <h1>Welcome, {user.email}</h1>
              <button onClick={handleLogout}>Logout</button>
              <TestAPI user={user} />  {/* Show TestAPI component if logged in */}
            </div>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;