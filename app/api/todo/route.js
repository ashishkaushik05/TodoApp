import Todo from "@models/todo";
import { connectToDB } from "@utils/database";



export const POST = async (request) => {
    const { creator, title, description, completed, completionDate } = await request.json();

    try {
        await connectToDB();
        const newTodo = new Todo({ creator, title, description, completed, completionDate });

        await newTodo.save();

        return new Response(JSON.stringify(newTodo), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new todo", { status: 500 });
    }
}

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const Todos = await Todo.find({})

        return new Response(JSON.stringify(Todos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch the todos", { status: 500 })
    }
} 


