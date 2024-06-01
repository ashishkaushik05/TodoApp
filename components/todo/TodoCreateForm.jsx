"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const TodoCreateForm = ({ onAddTodo }) => {
  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    description: '',
    completed: false,
    completionDate: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.completed && !formData.completionDate) {
      alert("Completion date is required if the task is marked as completed.");
      return;
    }
  
    try {
      const response = await axios.post('/api/todo', {
        ...formData,
        createdOn: new Date(),
      });
      onAddTodo(response.data);
      setFormData({
        creator: '',
        title: '',
        description: '',
        completed: false,
        completionDate: '',
      });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Creator"
        name="creator"
        value={formData.creator}
        onChange={handleChange}
        required
        fullWidth
        className="w-full bg-gray-100 rounded border-none outline-none"
      />
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        fullWidth
        className="w-full bg-gray-100 rounded border-none outline-none"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        className="w-full bg-gray-100 rounded border-none outline-none"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
        }
        label="Completed"
        className="block"
      />
      {formData.completed && (
        <TextField
          label="Completion Date"
          name="completionDate"
          type="datetime-local"
          value={formData.completionDate}
          onChange={handleChange}
          required={formData.completed}
          fullWidth
          className="w-full bg-gray-100 rounded border-none outline-none"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      <Button type="submit" variant="contained" color="primary" className="w-full py-3 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">
        Submit
      </Button>
    </form>
  );
};

export default TodoCreateForm;
