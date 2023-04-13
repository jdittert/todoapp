/* eslint-disable no-use-before-define */

export const tasks = [];

export const todayTasks = [];

export function updateToday() {
    tasks.forEach(task => () => {
        const today = new Date().toISOString().slice(0, 10);
        if (task.dueDate === today) {
            todayTasks.push(task);
        }
    });
};

export function updateProject(project) {
    let projectTasks = [];

    if (project) {
        projectTasks = tasks.filter(isProject);
    }

    function isProject(task) {
        if (task.project === project) {
            return true;
        }
        return false;
    };

    return projectTasks;
}
