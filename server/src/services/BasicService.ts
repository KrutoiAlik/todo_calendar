import {ServerResponse} from "http";

interface BasicService {

    get(params: any, res: ServerResponse): ServerResponse;

    post(params: any, res: ServerResponse): ServerResponse;

    put(params: any, res: ServerResponse): ServerResponse;

    delete(params: any, res: ServerResponse): ServerResponse;
}

export {
    BasicService
}