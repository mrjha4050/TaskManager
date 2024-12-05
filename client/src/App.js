import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import { AuthProvider } from './Context/AuthContext';
import TestAPI from './components/TestAPI';
import Login from './components/Login';
import KanbanBoard from './components/KanbanBoard';  

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
            <Login onLogin={handleLogin} />   
          ) : (
            <Routes>
              <Route path="/" element={<TestAPI user={user} />} />
              <Route path="/kanban/:roomCode" element={<KanbanBoard user={user} />} />
              <Route
                path="*"
                element={
                  <div>
                    <h1>Welcome, {user.email}</h1>
                    <button onClick={handleLogout}>Logout</button>
                    <TestAPI user={user} />
                  </div>
                }
              />
            </Routes>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;