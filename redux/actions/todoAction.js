import * as Types from '../contants/action-types';
import todoServices from '../services/todoServices';

export const actGetTodoListsRequest = () => {
    return async (dispatch) => {
        const res = await todoServices.getTodoList();

        return dispatch(actGetTodoLists(res));
    }
}

export const actGetTodoLists = (todoList) => {
    console.log('action todolist')
    return {
        type: Types.GET_TODO_LIST,
        payload: todoList
    }
}