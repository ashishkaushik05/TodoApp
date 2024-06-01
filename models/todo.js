import { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema({
  creator: {
    type: String,
    required: true, 
  },
  createdOn: {
    type: Date,
    required: true, 
    default: Date.now, 
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false, 
  },
  completionDate: {
    type: Date,
    required: function() {
      return this.completed;
    }
  }
});

const Todo = models.Todo || model('Todo', TodoSchema);
export default Todo;
