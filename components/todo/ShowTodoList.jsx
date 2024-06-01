"use client"
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowTodoList = ({ todos, onComplete, onDelete }) => {
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-5 rounded-lg">
      {sortedTodos.map((todo) => (
        <div key={todo._id} className="flex items-center justify-between border-b border-gray-300 py-2">
          <div className="flex-grow">
            <div className={`text-lg font-bold ${todo.completed ? 'line-through' : ''}`}>{todo.title}</div>
            <div className="text-sm">{todo.description}</div>
            <div className="text-sm text-gray-500">Created on: {new Date(todo.createdOn).toLocaleString()}</div>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => onComplete(todo._id)} 
            />
            <DeleteIcon 
              className="cursor-pointer text-red-500" 
              onClick={() => onDelete(todo._id)} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTodoList;
