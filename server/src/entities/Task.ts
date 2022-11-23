class Task {

    id: string;
    title: string;
    description: string;
    task_date: Date;
    userId: string;

    constructor(id: string, title: string, description: string, task_date: Date, userId: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.task_date = task_date;
        this.userId = userId;
    }

    getTask() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            task_date: this.task_date,
            userId: this.userId
        }
    }
}

export { Task }