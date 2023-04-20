/* eslint-disable no-use-before-define */

export const todayTasks = [];

export function updateToday(array) {
    todayTasks.length = 0;
    
    array.forEach(task => {
        const today = new Date().toISOString().slice(0, 10);
        if (task.dueDate === today) {
            todayTasks.push(task);
        }
    });
};

export function updateProject(array, project) {
    let projectTasks = [];

    if (project) {
        const projectAllTasks = array.filter(isProject);
        projectTasks = projectAllTasks.filter(isIncomplete);
    }

    function isProject(task) {
        if (task.project === project) {
            return true;
        }
        return false;
    };

    return projectTasks;
};

export function isIncomplete(task) {
    if (task.complete === 'yes') {
        return false;        
    };
    return true;
};

export function numberOfTasks(array) {
    if (array) {
        const incomplete = array.filter(isIncomplete);
        if (incomplete) return incomplete.length;
        return '0';
    }
        
    return '0';
};
