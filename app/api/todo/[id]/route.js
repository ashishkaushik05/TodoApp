import Todo from "@models/todo";
import { connectToDB } from "@utils/database";

export const PATCH = async (request, { params }) => {
    const { id } = params;
    const { completed } = await request.json();

    try {
        await connectToDB();
        const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });

        if (!updatedTodo) {
            return new Response("Todo not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedTodo), { status: 200 });
    } catch (error) {
        return new Response("Failed to update todo", { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    const { id } = params;
  
    try {
      await connectToDB();
  
      const deletedTodo = await Todo.findByIdAndDelete(id);
  
      if (!deletedTodo) {
        return new Response("Todo not found", { status: 404 });
      }
  
      return new Response("Todo deleted successfully", { status: 200 });
    } catch (error) {
      return new Response("Failed to delete the todo", { status: 500 });
    }
  };
