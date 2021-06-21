import axiosClient from "./axiosClient";

const todoApi = {
    getTodoList: () => {
        const url = 'todoLists';
        return axiosClient.get(url)
    }
}

export default todoApi;