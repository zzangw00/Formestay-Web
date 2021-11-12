const API = process.env.REACT_APP_API_URL;
console.log(API);

export const EndPoint = {
    POST_ADMIN_LOGIN: `${API}/login`,

    GET_USERS: `${API}/users`,
    GET_USER: `${API}/users/:userId`,
    POST_USER: `${API}/users`,
    PATCH_USER: `${API}/users/:userIdx`,
    PATCH_USER_STATUS: `${API}/users/:userId/status`,

    GET_AUTO_LOGIN: `${API}/auto-login`,

    POST_ADMIN: `${API}`,

    GET_ENTERPRISES: `${API}/enterprises`,
};

const TempAdminApiMap = {
    get: {
        [EndPoint.GET_USERS]: {},
        [EndPoint.GET_USER]: {},
        [EndPoint.GET_ENTERPRISES]: {},
        [EndPoint.GET_AUTO_LOGIN]: {},
    },
    post: {
        [EndPoint.POST_ADMIN_LOGIN]: {},
        [EndPoint.POST_USER]: {},
        [EndPoint.POST_ADMIN]: {},
    },
    patch: {
        [EndPoint.PATCH_USER]: {},
        [EndPoint.PATCH_USER_STATUS]: {},
    },
    put: {},
    delete: {},
};

export default TempAdminApiMap;
