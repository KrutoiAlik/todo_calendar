import {TaskService} from '../services/TaskService';
import {BasicService} from "../services/BasicService";
import {ProfileService} from "../services/ProfileService";
import {IncomingMessage, ServerResponse} from "http";

class Router {

    routes = new Map<string, BasicService>([
        ['/task', new TaskService()],
        ['/profile', new ProfileService()]
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

        if (service === undefined) {

            res.writeHead(404);
            res.end(`{"message": "Endpoint is not found"}`);
            return;
        }

        // TODO: session storage?
        const cookies = req.headers["set-cookie"];

        if (!cookies?.length
            || !cookies.filter((cookie: string) => cookie.includes('userId')).length) {
            res.writeHead(401);
            res.end('Please log in');
            return;
        }

        const userId = JSON.parse(cookies.filter(
            cookie => cookie.includes('userId')
        )[0]).userId;

        if (req.method === 'GET') {

            // url examples: /task/:id, /user/:id, /user, /task
            const urlParts = url.split('/');

            // to get params, expected id or nothing
            const id: string = urlParts.length > 2 ? urlParts[urlParts.length - 1] : '';

            service.get({id: id, userId: userId}, res);

        } else if (req.method === 'POST') {
            this.handleBodyRequest(req, res, service, (res, body) => {
                service.post({data: JSON.parse(body), userId: userId}, res);
            })
        } else if (req.method === 'PUT') {
            this.handleBodyRequest(req, res, service, (res, body) => {
                service.put({data: JSON.parse(body), userId: userId}, res);
            })
        } else if (req.method === 'DELETE') {
            this.handleBodyRequest(req, res, service, (res, body) => {
                service.delete({data: JSON.parse(body), userId: userId}, res);
            })
        }

        return res;
    }

    handleBodyRequest = (req: IncomingMessage,
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