import * as Types from '../contants/action-types';

const TodoReducer = (state = [], action) => {
    switch (action.type) {
        case Types.GET_TODO_LIST: {
            state = action.payload

            return [...state];
        }

        case Types.ADD_NEW_TODO: {
            const newTodo = action.payload;

            return [...state, newTodo];
        }

        default:
            return [...state];
    }
}

export default TodoReducer;