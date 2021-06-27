import { Alert } from 'react-native';
import * as Types from '../contants/action-types';

const initialState = {
    isLoading: false,
    error: false,
    data: []
}

const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.REQUEST_DATA_LOADING: {
            return {
                isLoading: true,
                error: false,
                data: [...state.data]
            }
        }

        case Types.REQUEST_DATA_FAILURE: {
            return {
                isLoading: false,
                error: true,
                data: [...state.data]
            }
        }

        case Types.GET_TODO_LIST: {
            state.data = action.payload

            return {
                isLoading: false,
                error: false,
                data: [...state.data]
            };
        }

        case Types.ADD_NEW_TODO: {
            const newTodo = action.payload;

            return {
                isLoading: false,
                error: false,
                data: [...state.data, newTodo]
            };
        }

        case Types.UPDATE_TODO: {
            const updatedTodo = action.payload;
            // Update todo in store
            state.data.forEach(todoItem => {
                if (todoItem.id === updatedTodo.id) {
                    todoItem = updatedTodo;
                }
            });

            return {
                isLoading: false,
                error: false,
                data: [...updatedTodo]
            };
        }

        case Types.DELETE_TODO: {
            const { id, isSuccess } = action.payload;
            state.data = state.data.filter(todoItem => todoItem.id !== id);

            if (isSuccess) {
                Alert('Delete Successfully!');
            }

            return {
                isLoading: false,
                error: false,
                data: [...state.data]
            };
        }

        default:
            return {
                isLoading: false,
                error: false,
                data: [...state.data]
            };;
    }
}

export default TodoReducer;