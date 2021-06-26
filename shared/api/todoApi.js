import axiosClient from "./axiosClient";
const url = 'todoLists';

const todoApi = {
    getTodoList: () => {
        return axiosClient.get(url)
    },

    addNewTodo: (todo) => {
        return axiosClient.post(url, todo)
    },

    updateTodo: (id, todo) => {
        return axiosClient.put(`${url}/${id}`, todo);
    },

    deleteTodo: (id) => {
        return axiosClient.delete(`${url}/${id}`)
    }
}

export default todoApi;