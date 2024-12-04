import React, { useState } from 'react';
import axios from 'axios';

const TestAPI = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const testBackend = async () => {
    try {
      const res = await axios.get('http://localhost:5001/rooms'); 
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div>
      <button onClick={testBackend}>Test Backend</button>
      <div>
        {response && <p>Response: {JSON.stringify(response)}</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
    </div>
  );
};

export default TestAPI;