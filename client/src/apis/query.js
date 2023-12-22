import axios from 'axios';

// const END_POINT = 'http://localhost:3000/query'
const END_POINT = 'https://6581742f.dorsy.net/query'

export const getQueryResults = (query) => {
    return axios.get(`${END_POINT}/`, {
        params: {
            query
        }
    });
}

export const setConnection = (connection) => {
    return axios.post(`${END_POINT}/connect`, {
        database: {
            ...connection
        }
    });
}

export const disconnect = () => {
    return axios.post(`${END_POINT}/disconnect`);
}