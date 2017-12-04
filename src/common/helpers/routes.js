import queryString from 'query-string';

export const buildUserListingURI = (query = {}) =>
    Object.keys(query).length > 0
        ? `/users?${queryString.stringify(query)}`
        : '/users';

export const buildLoginURI = (query = {}) =>
    Object.keys(query).length > 0
        ? `/login?${queryString.stringify(query)}`
        : '/login';

export default {
    buildUserListingURI,
};
