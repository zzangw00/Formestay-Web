const API = process.env.REACT_APP_API_URL
console.log(API)

export const EndPoint = {
  POST_USER_LOGIN: `${API}/users/login`,

  GET_USERS: `${API}/users`,
  GET_USER: `${API}/users/:userIdx`,
  POST_USER: `${API}/users`,
  PATCH_USER: `${API}/users/:userIdx`,
  PATCH_USER_STATUS: `${API}/users/:userIdx/status`,

  GET_AUTO_LOGIN: `${API}/users/jwt`,

  GET_BOARDS: `${API}/boards`,
  GET_BOARD: `${API}/boards/:boardIdx`,
  POST_BOARD: `${API}/boards`,
  PATCH_BOARD: `${API}/boards/:boardIdx`,
  PATCH_BOARD_STATUS: `${API}/boards/:boardIdx/status`,
}

const TempAdminApiMap = {
  get: {
    [EndPoint.GET_USERS]: {},
    [EndPoint.GET_USER]: {},
    [EndPoint.GET_BOARDS]: {},
    [EndPoint.GET_BOARD]: {},
    [EndPoint.GET_AUTO_LOGIN]: {},
  },
  post: {
    [EndPoint.POST_USER_LOGIN]: {},
    [EndPoint.POST_USER]: {},
    [EndPoint.POST_BOARD]: {},
  },
  patch: {
    [EndPoint.PATCH_USER]: {},
    [EndPoint.PATCH_USER_STATUS]: {},
    [EndPoint.PATCH_BOARD]: {},
    [EndPoint.PATCH_BOARD_STATUS]: {},
  },
  put: {
  },
  delete: {
  },
}

export default TempAdminApiMap
