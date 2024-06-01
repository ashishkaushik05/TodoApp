"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import TodoCreateForm from "@components/todo/TodoCreateForm";
import ShowTodoList from "@components/todo/ShowTodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const completeTodo = async (id) => {
    try {
      await axios.patch(`/api/todo/${id}`, { completed: true });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (error) {
      console.error('Error marking todo as complete:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
        Lixer's Todo
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-lg col-span-2">
          <h2 className="text-xl font-bold mb-4">Todo List</h2>
          <ShowTodoList 
            todos={todos} 
            onComplete={completeTodo} 
            onDelete={deleteTodo} 
          />
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Create a New Todo</h2>
          <TodoCreateForm onAddTodo={addTodo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
