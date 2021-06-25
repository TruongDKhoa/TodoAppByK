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

    async addNewTodo(todo) {
        console.log('addNewTodo service', todo);
        const newTodoModel = {
            name: todo.name,
            color: todo.mainColor,
            tasks: []
        }

        const response = await todoApi.addNewTodo(newTodoModel);
        return response;
    }
}

export default todoServices;
