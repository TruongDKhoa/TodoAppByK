import axios from 'axios';
import queryString from 'query-string';

// Set default config for http request
const axiosClient = axios.create({
    baseURL: 'https://json-server-todoappbyk.herokuapp.com',
    headers: { 'content-type': 'application/json' },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle error;
    throw (error);
})

export default axiosClient;