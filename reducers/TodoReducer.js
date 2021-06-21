import * as Types from '../contants/action-types';

const TodoReducer = (state = [], action) => {
    switch (action.type) {
        case Types.GET_TODO_LIST: {
            state = action.payload

            return [...state];
        }

        default:
            return [...state];
    }
}

export default TodoReducer;