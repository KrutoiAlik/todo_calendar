import { createServer, IncomingMessage, RequestListener, Server, ServerResponse } from 'http';
import { TaskService } from './services/TaskService';
import { Http } from './utils/utils';

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

    if (req.method === Http.GET) {
        handleGetRequest(req, res);
    }

    if (req.method === Http.POST) {
        handlePostRequest(req, res);
    }

}

const server: Server = createServer(requestListener);

server.listen(PORT, IP, () => {
    console.log('Server is running...');
});

function handleGetRequest(req: IncomingMessage, res: ServerResponse) {

    const taskService = new TaskService();

    if (req.url?.startsWith('/task/')) {

        const taskId = req.url.split('/')[1];

        // TODO: set status code according to DB result
        res.writeHead(200);
        res.end(JSON.stringify(taskService.getTask(taskId)));
    } else if (req.url === '/tasks') {
        res.writeHead(200);
        res.end(JSON.stringify(taskService.getAllTasks()));
    } else {
        res.writeHead(404);
        res.end(`{"message": "Nothing to show"}`);
    }

}

function handlePostRequest(req: IncomingMessage, res: ServerResponse) {

    if (req.url === '/task') {

        const task = req.read;
        console.log(task);      
    }

}

