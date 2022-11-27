import {Task} from "../entities/Task";
import {BasicService} from "./BasicService";
import {ServerResponse} from "http";
import {Dao} from "../dao/Dao";

class TaskService extends BasicService {

    async getTask(taskId: string): Promise<Task> {
        return await Dao.db_get(`SELECT id, title, description, task_date 
                                 FROM tasks WHERE id = '${taskId}'`) as Task;
    }

    public async getAllTasks(params: any): Promise<Task[]> {
        return await Dao.db_all(`SELECT id, title, description, userId, task_date
                                 FROM tasks WHERE ${this.paramsToWhereQuery(params)}`) as Task[];
    }

    public async createTask(task: Task) {
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

    public async deleteTask(taskIds: string[]) {
        return await Dao.db_run(`DELETE FROM tasks VALUES id IN ('${taskIds.join(',')}')`);
    }

    // TODO: Make all requests receive a collection of items, not by one
    async get(params: any, res: ServerResponse) {

        if (params.id === '') {

            const sqlConditions: any = {
                userId: params.userId
            };

            if (params.url.includes('?')) {
                const urlParams = params.url.substring(params.url.indexOf('?') + 1).split('&');
                for (const urlParam of urlParams) {
                    const condition = urlParam.split('=');
                    sqlConditions[condition[0]] = `'${condition[1]}'`;
                }
            }

            const tasks: Task[] = await this.getAllTasks(sqlConditions) || [];

            res.writeHead(200);
            res.end(JSON.stringify(tasks));
        } else {
            const task: Task = await this.getTask(params.id);

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

        await this.deleteTask(params.data.ids);

        res.writeHead(204, 'Removed successfully');
        res.end();

        return res;
    }

    paramsToWhereQuery(params: any): string {

        let conditions = [];

        for (const key in params) {
            conditions.push(`${key} = ${params[key]}`);
        }

        return conditions.join(' and ');
    }
}

export {TaskService}