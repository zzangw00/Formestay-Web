import Axios from "axios"
import TempAdminApiMap from "./TempAdminApiMap"
import {getJwt} from "../utils/session/sessionManager"
import {isEmpty} from "../utils/common/commonFunction"

export {EndPoint} from "./TempAdminApiMap"
export const HttpMethod = {
    DELETE: "delete",
    GET: "get",
    POST: "post",
    PUT: "put",
    PATCH: "patch",
}

export default class TempAdminApi {
    static request({data, query, path, method, url}) {
        try {
            if (isEmpty(method) || isEmpty(url)) {
                throw new Error("TempAdminApi needs url and method")
            }

            const api = TempAdminApiMap[method][url]
            if (api === undefined) {
                throw new Error(`TempAdminApi does not have the mapping ${method}, ${url}`)
            }

            if (path) {
                for (const [key, value] of Object.entries(path)) {
                    url = url.replace(`:${key}`, value)
                }
            }

            if (!isEmpty(query)) {
                url += "?" + Object.keys(query).map(key => key + "=" + query[key]).join("&")
            }

            const headers = {
              "accept": "application/json",
              "Content-Type": "application/json",
              "X-Access-Token": getJwt()
            }

            switch (method) {
                case HttpMethod.GET:
                    return Axios.get(url, {headers: headers})
                case HttpMethod.POST:
                    return Axios.post(url, data, {headers: headers})
                case HttpMethod.PATCH:
                    return Axios.patch(url, data, {headers: headers})
                case HttpMethod.PUT:
                    return Axios.put(url, data, {headers: headers})
                case HttpMethod.DELETE:
                    return Axios.delete(url, data, {headers: headers})
                default:
                    break
            }
        } catch (err) {
            return "axios cannot be created"
        }
    }
}
