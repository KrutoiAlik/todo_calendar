class Task {

    id: string;
    title: string;
    description: string;
    date: Date;

    constructor(id: string, title: string, description: string, date: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }

    getTask() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            date: this.date
        }
    }
}

export { Task }