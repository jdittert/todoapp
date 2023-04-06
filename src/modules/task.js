export default class Task {
    constructor(name, description, dueDate, priority, project, complete) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.complete = complete;
    }   
}