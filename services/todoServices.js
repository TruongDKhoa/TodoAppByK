//
//  Define Todo Services
//

const todoServices = {
    async getTodoList() {
        const response = await fetch("https://json-server-todoappbyk.herokuapp.com/todoLists");
        const result = await response.json();

        return result;
    },

    getTodoDetail(id) {
        console.log('gettododetail service', id);
    }
}

export default todoServices;
