import * as Types from '../contants/action-types';
import todoServices from '../../services/todoServices';

// Action: Get all todo list.
export const actGetTodoListsRequest = () => {
    return async (dispatch) => {
        const res = await todoServices.getTodoList();

        return dispatch(actGetTodoLists(res));
    }
}
export const actGetTodoLists = (todoList) => {
    return {
        type: Types.GET_TODO_LIST,
        payload: todoList
    }
}


// Action: Add new todo.
export const actAddNewTodoRequest = (todo) => {
    return async (dispatch) => {
        const res = await todoServices.addNewTodo(todo);

        return dispatch(actAddNewTodo(res));
    }
}
export const actAddNewTodo = (todo) => {
    return {
        type: Types.ADD_NEW_TODO,
        payload: todo
    }
}

// Action: Update task list
export const actUpdateTodoRequest = (id, todo) => {
    return async (dispatch) => {
        const res = await todoServices.updateTodo(id, todo)

        return dispatch(actUpdateTodo(res));
    }
}
export const actUpdateTodo = (updatedTodo) => {
    return {
        type: Types.UPDATE_TODO,
        payload: updatedTodo
    }
}