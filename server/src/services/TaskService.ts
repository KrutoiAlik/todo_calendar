import {Task} from "../entities/Task";
import {BasicService} from "./BasicService";
import {ServerResponse} from "http";
import {Dao} from "../dao/Dao";
import Utils from "../utils/utils";
import {Database, RunResult} from "sqlite3";

class TaskService extends BasicService {

    public async createTasks(tasks: Task[]): Promise<RunResult> {

        const sqlTasks = tasks.map(task => `('${task.title}', '${task.description}', '${task.userId}', '${task.task_date}', 'todo')`);

        return await Dao.db_run(`INSERT INTO tasks(title,description,userId, task_date, status)
                                        VALUES ${sqlTasks.join(',')}`) as RunResult;
    }

    public async getTasks(params: any) {
        return await Dao.db_all(`SELECT id, title, description, userId, task_date, status 
                                        FROM tasks
                                        WHERE ${Utils.generateWhereConditionsString(params, 'and')}`);
    }

    public async updateTasks(tasks: Task[]) {

        const db: Database = Dao.getInstance() as Database;

        await Dao.massUpdate('tasks', tasks);

        return await new Promise((resolve, reject) => {
            db.all(
                `SELECT id, title, description, task_date, status, userId 
                      FROM tasks
                      WHERE id IN (${tasks.map(task => task.id).join(', ')})`,
                (err, rows) => {
                    Dao.closeInstance();
                    if (err) {
                        reject(err);
                    }

                    resolve(rows);
                }
            );
        })
    }

    public async deleteTasks(taskIds: string[]) {
        return await Dao.db_run(`DELETE FROM tasks WHERE id IN ('${taskIds.join(',')}')`);
    }

    async get(params: any, res: ServerResponse) {

        const taskParams: any = {
            id: params.id,
            userId: params.userId
        };

        if (params.url.includes('?')) {
            const urlParams = params.url.substring(params.url.indexOf('?') + 1).split('&');
            for (const urlParam of urlParams) {
                const condition: string[] = urlParam.split('=');
                taskParams[condition[0]] = `'${condition[1]}'`;
            }
        }

        const tasks: Task[] = await this.getTasks(taskParams) as Task[];

        if (!tasks.length) {
            res.writeHead(404);
            res.end(`{"message": "No task found"}`);
            return res;
        }

        res.writeHead(200);
        res.end(JSON.stringify(tasks));

        return res;
    }

    async post(params: any, res: ServerResponse) {

        const tasks = params.data.tasks.map((task: Task) => ({...task, userId: params.userId}));

        let result: RunResult = await this.createTasks(tasks);

        res.writeHead(200);
        res.end();

        return res;
    }

    async put(params: any, res: ServerResponse) {

        const tasks = params.data.tasks.map((task: Task) => ({...task, userId: params.userId}));

        try {
            const updatedTasks = await this.updateTasks(tasks);

            console.log({updatedTasks})

            res.writeHead(200, 'Updated successfully');
            res.end(JSON.stringify(updatedTasks));
        } catch (err: any) {
            res.writeHead(409);
            res.end('Insert is failed: ' + err.message);
        }

        return res;
    }

    async delete(params: any, res: ServerResponse) {

        await this.deleteTasks(params.data.ids);

        res.writeHead(204, 'Removed successfully');
        res.end();

        return res;
    }
}

export {TaskService}