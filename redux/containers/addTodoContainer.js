import { connect } from "react-redux";
import AddTodo from "../../components/addTodo";
import { actAddNewTodoRequest } from "../actions/todoAction";

const mapStateToProps = (state, ownProps) => {
    return {
        todoList: state.TodoReducer,
        ownProps: ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewTodo: (newTodo) => dispatch(actAddNewTodoRequest(newTodo))
    }
}

export default AddTodoContainer = connect(mapStateToProps, mapDispatchToProps)(AddTodo);