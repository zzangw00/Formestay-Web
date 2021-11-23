const API = process.env.REACT_APP_API_URL;
console.log(API);

export const EndPoint = {
    POST_ADMIN_LOGIN: `${API}/login`,

    GET_USERS: `${API}/users`,
    GET_USER: `${API}/users/:userId`,
    POST_USER: `${API}/users`,
    PATCH_USER: `${API}/users/:userId`,
    PATCH_USER_STATUS: `${API}/users/:userId/status`,

    GET_AUTO_LOGIN: `${API}/auto-login`,

    POST_ADMIN: `${API}`,

    GET_ENTERPRISES: `${API}/enterprises`,
    GET_ENTERPRISE: `${API}/enterprises/:enterpriseId`,

    GET_PROGRAMS: `${API}/programs/:enterpriseId`,
    GET_PROGRAM: `${API}/program/:programId`,

    PATCH_ENTERPRISE: `${API}/enterprises/:enterpriseId`,
    PATCH_ENTERPRISE_STATUS: `${API}/enterprises/:enterpriseId/status`,

    POST_ENTERPRISE: `${API}/enterprise`,

    PATCH_PROGRAM_STATUS: `${API}/program/:programId/status`,
};

const TempAdminApiMap = {
    get: {
        [EndPoint.GET_USERS]: {},
        [EndPoint.GET_USER]: {},
        [EndPoint.GET_ENTERPRISES]: {},
        [EndPoint.GET_ENTERPRISE]: {},
        [EndPoint.GET_AUTO_LOGIN]: {},
        [EndPoint.GET_PROGRAMS]: {},
        [EndPoint.GET_PROGRAM]: {},
    },
    post: {
        [EndPoint.POST_ADMIN_LOGIN]: {},
        [EndPoint.POST_USER]: {},
        [EndPoint.POST_ADMIN]: {},
        [EndPoint.POST_ENTERPRISE]: {},
    },
    patch: {
        [EndPoint.PATCH_USER]: {},
        [EndPoint.PATCH_USER_STATUS]: {},
        [EndPoint.PATCH_ENTERPRISE]: {},
        [EndPoint.PATCH_ENTERPRISE_STATUS]: {},
        [EndPoint.PATCH_PROGRAM_STATUS]: {},
    },
    put: {},
    delete: {},
};

export default TempAdminApiMap;
