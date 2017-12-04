import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_SERVER;

const api = axios.create({
    baseURL: apiEndpoint,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const customError = (code = '500', errMsg = 'Custom Error') => {
    const err = new Error(errMsg);
    err.code = code;
    return err;
};

export default api;
