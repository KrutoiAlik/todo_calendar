import {ServerResponse} from "http";
import {BasicService} from "./BasicService";

class ProfileService implements BasicService {

    delete(params: any, res: ServerResponse): ServerResponse {
        return res;
    }

    get(params: any, res: ServerResponse): ServerResponse {
        return res;
    }

    post(params: any, res: ServerResponse): ServerResponse {
        return res;
    }

    put(params: any, res: ServerResponse): ServerResponse {
        return res;
    }


}

export {
    ProfileService
}