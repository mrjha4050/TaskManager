import React from 'react';
import './App.css';
import TestAPI from './components/TestAPI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Backend Test</h1>
        <TestAPI />
      </header>
    </div>
  );
}

export default App;