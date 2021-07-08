// import { connect } from 'react-redux';
// import TodoDetail from '../../components/todoDetail';
// import { actUpdateTodoRequest } from '../actions/todoAction';

// const mapStateToProps = (state, ownProps) => {
//     return {
//         todo: ownProps.todo,
//         isLoading: state.TodoReducer.isLoading,
//         error: state.TodoReducer.error
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateTodo: (id, todo) => {
//             dispatch(actUpdateTodoRequest(id, todo));
//         }
//     }
// }

// export default TodoDetailContainer = connect(mapStateToProps, mapDispatchToProps)(TodoDetail);