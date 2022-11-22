import {ServerResponse} from "http";

abstract class BasicService {


    async get(params: any, res: ServerResponse): Promise<ServerResponse> {
        return res;
    };

    async post(params: any, res: ServerResponse): Promise<ServerResponse> {
        return res;
    };

    async put(params: any, res: ServerResponse): Promise<ServerResponse> {
        return res;
    };

    async delete(params: any, res: ServerResponse): Promise<ServerResponse> {
        return res;
    };
}

export {
    BasicService
}