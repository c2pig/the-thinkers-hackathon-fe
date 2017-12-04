import api from './apiHelper';

export const loginUser = ({ cookieID, email, password, isRememberMe }) => {
    const user = {
        email,
        password,
        cookieID,
        lifeSpan: isRememberMe ? 'long' : 'short',
    };
    return api.post('/signin', user).then(response => {
        return response.data;
    });
};

export default {
    loginUser,
};
