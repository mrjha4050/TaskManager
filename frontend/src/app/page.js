"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    axios.get('/api/tasks') // Use the proxy route or full backend URL
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <div>
      <h1>Kanban Board</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KanbanBoard;