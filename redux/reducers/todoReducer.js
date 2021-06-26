import { Alert } from 'react-native';
import * as Types from '../contants/action-types';

const TodoReducer = (state = [], action) => {
    switch (action.type) {
        case Types.GET_TODO_LIST: {
            state = action.payload

            return [...state];
        }

        case Types.ADD_NEW_TODO: {
            console.log('ADD NEW TODO: ', state);
            const newTodo = action.payload;

            return [...state, newTodo];
        }

        case Types.UPDATE_TODO: {
            const updatedTodo = action.payload;
            // Update task
            state.forEach(todoItem => {
                if (todoItem.id === updatedTodo.id) {
                    todoItem = updatedTodo;
                }
            });

            return [...updatedTodo];
        }

        case Types.UPDATE_TODO: {
            const updatedTodo = action.payload;
            // Update todo in store
            state.forEach(todoItem => {
                if (todoItem.id === updatedTodo.id) {
                    todoItem = updatedTodo;
                }
            });

            return [...updatedTodo];
        }

        case Types.DELETE_TODO: {
            const { id, isSuccess } = action.payload;
            state = state.filter(todoItem => todoItem.id !== id);
            if (isSuccess) {
                Alert('Delete Successfully!');
            }
            return [...state];
        }

        default:
            return [...state];
    }
}

export default TodoReducer;