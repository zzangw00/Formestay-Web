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
    PATCH_PROGRAM: `${API}/program/:programId`,

    POST_ROOMPRICE: `${API}/program/price`,
    GET_ROOMPRICE: `${API}/program/programRoomPrice/:programRoomPriceId`,
    PATCH_ROOMPRICE: `${API}/program/programRoomPrice/:programRoomPriceId`,
    PATCH_ROOMPRICE_STATUS: `${API}/programRoomPrice/:programRoomPriceId/status`,
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
        [EndPoint.GET_ROOMPRICE]: {},
    },
    post: {
        [EndPoint.POST_ADMIN_LOGIN]: {},
        [EndPoint.POST_USER]: {},
        [EndPoint.POST_ADMIN]: {},
        [EndPoint.POST_ENTERPRISE]: {},
        [EndPoint.POST_ROOMPRICE]: {},
    },
    patch: {
        [EndPoint.PATCH_USER]: {},
        [EndPoint.PATCH_USER_STATUS]: {},
        [EndPoint.PATCH_ENTERPRISE]: {},
        [EndPoint.PATCH_ENTERPRISE_STATUS]: {},
        [EndPoint.PATCH_PROGRAM_STATUS]: {},
        [EndPoint.PATCH_PROGRAM]: {},
        [EndPoint.PATCH_ROOMPRICE]: {},
        [EndPoint.PATCH_ROOMPRICE_STATUS]: {},
    },
    put: {},
    delete: {},
};

export default TempAdminApiMap;
