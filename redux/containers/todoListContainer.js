import { connect } from 'react-redux';
import { actDeleteTodoRequest, actGetTodoListsRequest } from '../actions/todoAction';
import TodoList from '../../components/todoList';

const mapStateToProps = (state) => {
    return {
        todoList: state.TodoReducer.data,
        isLoading: state.TodoReducer.isLoading,
        error: state.TodoReducer.error
    }
}

const mapDispatchToProps = (dispatch, prop) => {
    return {
        getTodoList: () => {
            dispatch(actGetTodoListsRequest())
        },

        deleteTodo: (id) => {
            dispatch(actDeleteTodoRequest(id))
        }
    }
}

export default TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);