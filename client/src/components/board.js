import React from 'react';
import { useParams } from 'react-router-dom';

const KanbanBoard = () => {
  const { roomCode } = useParams();

  return (
    <div>
      <h1>Kanban Board for Room {roomCode}</h1>
      {/* Implement the logic to display and manage tasks */}
    </div>
  );
};

export default KanbanBoard;