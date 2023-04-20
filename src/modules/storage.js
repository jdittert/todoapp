export default class Storage {
    static saveTasks(array) {
        localStorage.setItem('tasks', JSON.stringify(array));
    }

    static getTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        return tasks;
    }

    static saveProjects(array) {
        localStorage.setItem('projects', JSON.stringify(array));
    }

    static getProjects() {
        const projects = JSON.parse(localStorage.getItem('projects'));
        return projects;
    }
}