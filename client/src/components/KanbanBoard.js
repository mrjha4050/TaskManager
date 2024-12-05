import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("http://localhost:5001/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleExit = () => {
    navigate("/");
  };

  const addTask = () => {
    if (taskInput.trim() === "") {
      console.error("Task input is empty.");
      return;
    }
    const taskData = {
      title: taskInput,
      roomId: "yourRoomId", 
      description: "Task description", 
      status: "To Do" 
    };
    axios.post("http://localhost:5001/api/tasks", taskData)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTaskInput("");
        if (inputRef.current) inputRef.current.focus();  
      })
      .catch((error) => {
        console.error("Error adding task:", error.response ? error.response.data : error);
      });
  };

  const removeTask = (id) => {
    axios.delete(`http://localhost:5001/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => removeTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleExit}>Exit</button>
    </div>
  );
}

export default KanbanBoard;