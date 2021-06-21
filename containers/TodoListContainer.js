import { connect } from 'react-redux';
import { actGetTodoListsRequest } from '../actions/todoAction';
import TodoList from '../components/todoList';

const mapStateToProps = (state) => {
    return {
        todoList: state.TodoReducer
    }
}

const mapDispatchToProps = (dispatch, prop) => {
    return {
        getTodoList: () => {
            dispatch(actGetTodoListsRequest())
        }
    }
}

export default TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);