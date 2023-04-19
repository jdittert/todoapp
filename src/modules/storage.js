export default class Storage {
    static saveTasks(array) {
        localStorage.setItem('tasks', JSON.stringify(array));
    }

    static getTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        return tasks;
    }
}