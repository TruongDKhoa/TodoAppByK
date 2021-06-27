import * as Types from '../contants/action-types';
import todoServices from '../../services/todoServices';
import * as _ from 'lodash';
import { requestDataLoading, requestDataFailure } from './baseAction';

// Action: Get all todo list.
export const actGetTodoListsRequest = () => {
    return async (dispatch) => {
        dispatch(requestDataLoading());
        const res = await todoServices.getTodoList();

        if (res && res.length > 0) {
            return dispatch(actGetTodoLists(res));
        } else {
            return dispatch(requestDataFailure());
        }
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
        dispatch(requestDataLoading());
        const res = await todoServices.addNewTodo(todo);

        if (!_.isEmpty(res)) {
            return dispatch(actAddNewTodo(res));
        } else {
            return dispatch(requestDataFailure());
        }
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
        dispatch(requestDataLoading());
        const res = await todoServices.updateTodo(id, todo)

        if (res && res.length > 0) {
            return dispatch(actUpdateTodo(res));
        } else {
            return dispatch(requestDataFailure());
        }
    }
}
export const actUpdateTodo = (updatedTodo) => {
    return {
        type: Types.UPDATE_TODO,
        payload: updatedTodo
    }
}

// Action: Delete a todo
export const actDeleteTodoRequest = (id) => {
    return async (dispatch) => {
        dispatch(requestDataLoading());
        const res = await todoServices.deleteTodo(id);

        if (_.isEmpty(res)) {
            return dispatch(actDeleteTodo(id, res));
        } else {
            return dispatch(requestDataFailure());
        }
    }
}
export const actDeleteTodo = (id, res) => {
    return {
        type: Types.DELETE_TODO,
        payload: {
            id: id,
            isSuccees: _.isEmpty(res)
        }
    }
}