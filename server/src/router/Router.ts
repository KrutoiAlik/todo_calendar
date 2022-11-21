import {TaskService} from '../services/TaskService';
import {BasicService} from "../services/BasicService";
import {IncomingMessage, ServerResponse} from "http";
import {ProfileService} from "../services/ProfileService";

class Router {

    routes = new Map<string, BasicService>([
        ['/task', new TaskService()],
        ['/user', new ProfileService()]
    ]);

    getServer = (url: string) => {
        if (this.routes.has(url)) {
            return this.routes.get(url);
        }

        for (const [route, value] of this.routes) {
            if (url.startsWith(route)) {
                return value;
            }
        }

        return undefined;
    }

    handleRequest = (req: IncomingMessage, res: ServerResponse) => {
        const url: string = req.url || '';
        const service: BasicService | undefined = this.getServer(url);

        console.log(url);
        console.log({service});

        if (service === undefined) {

            // TODO: send error response
            res.end(`{"message": "Endpoint is not found"}`);
            return;
        }

        if (req.method === 'GET') {

            // url examples: /task/:id, /user/:id, /user, /task
            const urlParts = url.split('/');

            // to get params, expected id or nothing
            const id: string = urlParts.length > 2 ? urlParts[urlParts.length - 1] : '';

            service.get({id: id}, res);

        } else if (req.method === 'POST') {
            this.handlePostRequest(req, res, service, (res, body) => {
                service.post({body: body}, res);
            })
        }

        return res;
    }

    handlePostRequest = (req: IncomingMessage,
                         res: ServerResponse,
                         service: BasicService,
                         callback: (
                             res: ServerResponse,
                             body: string
                         ) => void) => {

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            callback(res, body);
        })
    }

}

export {
    Router
}