//
//  Define Todo Services
//
import todoApi from "../shared/api/todoApi";

const todoServices = {
    // Get all todo List
    async getTodoList() {
        // try {
        //     const response = await todoApi.getTodoList();
        //     return response;
        // } catch (error) {
        //     throw (error);
        // }
        const response = await todoApi.getTodoList();
        return response;
    },

    getTodoDetail(id) {
        console.log('gettododetail service', id);
    }
}

export default todoServices;
