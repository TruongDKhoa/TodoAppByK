//
//  Define Todo Services
//
import todoApi from "../shared/api/todoApi";

const todoServices = {
    // Get all todo List
    async getTodoList() {
        // try {
        //     const response = await todoApi.getTodoList();
        //     return response;
        // } catch (error) {
        //     throw (error);
        // }
        const response = await todoApi.getTodoList();
        return response;
    },

    // Add new todo
    async addNewTodo(todo) {
        const newTodoModel = {
            name: todo.name,
            color: todo.mainColor,
            tasks: []
        }

        const response = await todoApi.addNewTodo(newTodoModel);
        return response;
    },

    // Update a todo
    async updateTodo(id, todo) {
        const response = await todoApi.updateTodo(id, todo);
        return response;
    },

    // Delete a todo
    async deleteTodo(id) {
        try {
            const response = await todoApi.deleteTodo(id);
            return response;
        } catch (error) {
            throw (error)
        }
    }

}

export default todoServices;
