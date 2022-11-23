import {Task} from "../entities/Task";
import {BasicService} from "./BasicService";
import {ServerResponse} from "http";
import {Dao} from "../dao/Dao";

class TaskService extends BasicService {

    async getTask(taskId: string): Promise<Task> {
        return await Dao.db_get(`SELECT id, name FROM tasks WHERE id = '${taskId}'`) as Task;
    }

    public async getAllTasks(userId: string): Promise<Task[]> {
        return await Dao.db_get(`SELECT id, title, description, userId
                                        FROM tasks WHERE userId = '${userId}'`) as Task[];
    }

    public async createTask(task: Task) {
        console.log({task})
        return await Dao.db_run(`INSERT INTO tasks(title,description,userId, task_date)
                                        VALUES('${task.title}', '${task.description}', '${task.userId}', '${task.task_date}')`);
    }

    public async updateTask(task: Task | any) {

        let setQuery = '';
        for (const taskKey in task) {
            setQuery += `${taskKey} = ${task[taskKey]}`;
        }

        return await Dao.db_run(`UPDATE tasks SET ${setQuery}`);
    }

    public async deleteTask(taskId: string) {
        return await Dao.db_run(`DELETE FROM tasks VALUES id = '${taskId}'`);
    }

    async get(params: any, res: ServerResponse) {

        if (params.id === '') {
            const tasks: Task[] = await this.getAllTasks(params.userId) as Task[] || [];

            res.writeHead(200);
            res.end(JSON.stringify(tasks));
        } else {
            const task: Task = await this.getTask(params.id) as Task;

            console.log(task)
            if (task) {
                res.writeHead(200);
                res.end(JSON.stringify(task));
            } else {
                res.writeHead(404);
                res.end(`No task found`);
            }
        }

        return res;
    }

    async post(params: any, res: ServerResponse) {

        console.log({params});

        const task = {...params.data, userId: params.userId};
        let taskId = await this.createTask(task);

        if (taskId) {
            res.writeHead(201, 'Success');
            res.end(JSON.stringify({id: taskId, ...task}));
        } else {
            res.writeHead(409);
            res.end('Insert is failed');
        }

        return res;
    }

    async put(params: any, res: ServerResponse) {

        const task = {...params.data, userId: params.userId};
        let taskId = await this.updateTask(task);

        if (taskId) {
            res.writeHead(204, 'Updated successfully');
            res.end(JSON.stringify({id: taskId, ...task}));
        } else {
            res.writeHead(409);
            res.end('Insert is failed');
        }

        return res;
    }

    async delete(params: any, res: ServerResponse) {

        await this.deleteTask(params.data.taskId);

        res.writeHead(204, 'Removed successfully');
        res.end();

        return res;
    }
}

export {TaskService}