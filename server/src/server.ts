import {createServer, IncomingMessage, RequestListener, Server, ServerResponse} from 'http';
import {Router} from "./router/Router";

const PORT = 5000;
const IP = 'localhost';

const requestListener: RequestListener = (req: IncomingMessage, res: ServerResponse) => {

    // All tasks should be assigned to a date string
    // GET retrieve tasks
    // POST create a task -> json body
    // PUT update a task
    // DELETE a task

    // Also need to add a User/Profile endpoints
    // All tasks should be linked only to selected user/profile

    // Tables: profiles, tasks
    // Profile: {id, name}
    // Task: {id, title, description, date, attachments?}

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const router: Router = new Router();

    router.handleRequest(req, res);

}

const server: Server = createServer(requestListener);

server.listen(PORT, IP, () => {
    console.log('Server is running...');
});

