import {Task} from "../entities/Task";
import {BasicService} from "./BasicService";
import {ServerResponse} from "http";

class TaskService implements BasicService {

    public getTask(id: string) {

        // TODO: replace with actual record from DB
        return new Task('1', 'title', 'description', new Date());
    }

    public getAllTasks() {
        return [
            new Task('1', 'title1', 'description', new Date()),
            new Task('2', 'title2', 'description', new Date()),
            new Task('3', 'title3', 'description', new Date()),
            new Task('4', 'title4', 'description', new Date()),
            new Task('5', 'title5', 'description', new Date()),
            new Task('6', 'title6', 'description', new Date())
        ];
    }

    public async createTask(task: Task) {
        // TODO: create task in DB by changed fields
    }

    public async updateTask(task: Task) {
        // TODO: update task in DB by changed fields
    }

    public async deleteTask(task: Task) {
        // TODO: delete task in DB by changed fields
    }

    delete(params: any, res: ServerResponse): ServerResponse {
        return res;
    }

    get(params: any, res: ServerResponse): ServerResponse {

        let body = '';

        if (params.id === '') {
            body = JSON.stringify(this.getAllTasks());
        } else {
            body = JSON.stringify(this.getTask(params.id));
        }

        res.writeHead(200, 'Success');
        res.end(JSON.stringify(body));

        return res;
    }

    post(params: any, res: ServerResponse): ServerResponse {

        const body = params.body;

        console.log({body: JSON.parse(body)});

        res.writeHead(200, 'Success');
        res.end(JSON.stringify(body));

        return res;
    }

    put(params: any, res: ServerResponse): ServerResponse {
        return res;
    }
}

export {TaskService}