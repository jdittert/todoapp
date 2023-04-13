/* eslint-disable no-use-before-define */
import './style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { includes, startCase } from 'lodash';
import format from 'date-fns/format';
import Task from './modules/task';
import { tasks, todayTasks, updateProject, updateToday } from './arrays';


// Create task and project arrays
const projects = ['inbox', 'today'];
const priorities = [1, 2, 3, 4];

// Update project array
function updateProjects() {
    tasks.forEach(task => {
        if (!projects.includes(`${task.project.toLowerCase()}`)) {
            projects.push(`${task.project.toLowerCase()}`);
        }
    });
}

// Prepopulate with test tasks
const taskOne = new Task('To Do App', 'code for Odin Project', '2023-04-23', 'high', 'odin project', 'no');
tasks.push(taskOne);
const taskTwo = new Task('Lunch', 'eat some healthy food', '2023-04-07', 'low', 'life', 'no');
tasks.push(taskTwo);

// Create main
function main() {
    const element = document.createElement('main');
    element.setAttribute('id', 'main');
    return element;
}

// Load page main
document.body.appendChild(main());
const mainDiv = document.getElementById('main');

// Create header
const header = document.createElement('div');
header.setAttribute('id', 'header');
mainDiv.appendChild(header);

// Header content
const sidebarCollapse = document.createElement('div');
header.appendChild(sidebarCollapse);
sidebarCollapse.classList.add('header-icon');
const menuImage = document.createElement('img');
menuImage.setAttribute('src', './images/menu.svg');
sidebarCollapse.appendChild(menuImage);

const appName = document.createElement('div');
header.appendChild(appName);
appName.classList.add('brand-name');
appName.innerText = 'Todoish';

// Create sidebar
const sidebar = document.createElement('div');
sidebar.setAttribute('id', 'sidebar');
mainDiv.appendChild(sidebar);

// Sidebar collapse
sidebarCollapse.addEventListener('click', toggleSidebar);
function toggleSidebar() {
    sidebar.classList.toggle('hide');
};

// Add projects to sidebar
function updateSidebar() {
    sidebar.innerText = '';
    projects.forEach(project => addToSidebar(project));

    function addToSidebar(project) {
        const projectNameDiv = document.createElement('div')
        projectNameDiv.setAttribute('id', `${project}`);
        sidebar.appendChild(projectNameDiv);
        const projectButton = document.createElement('button');
        projectButton.classList.add('project-button');
        projectButton.innerText = startCase(`${project}`);
        const projectList = updateProject(project);
        projectButton.addEventListener('click', () => { updateTaskList(projectList) });
        projectNameDiv.appendChild(projectButton);
    }

    const todayTest = document.createElement('div');
    todayTest.setAttribute('id', 'today-test');
    sidebar.appendChild(todayTest);
    const todayTestButton = document.createElement('button');
    todayTestButton.classList.add('project-button');
    todayTestButton.innerText = 'Today Test';
    const todayList = updateToday();
    todayTestButton.addEventListener('click', () => { updateTaskList(todayList) });
    todayTest.appendChild(todayTestButton);
};

// Create task section
const taskSection = document.createElement('div');
taskSection.setAttribute('id', 'task-section');
mainDiv.appendChild(taskSection);

// Wrap task section
const taskWrapper = document.createElement('div');
taskWrapper.setAttribute('id', 'task-wrapper');
taskSection.appendChild(taskWrapper);

// Set up task wrapper
const rightBumper = document.createElement('div');
taskWrapper.appendChild(rightBumper);
const taskList = document.createElement('div');
taskList.setAttribute('id', 'task-list');
taskWrapper.appendChild(taskList);
const leftBumper = document.createElement('div');
taskWrapper.appendChild(leftBumper);

// Global list elements
const listTitle = document.createElement('div');
listTitle.setAttribute('id', 'list-title');
taskList.appendChild(listTitle);

// Display task list
const taskUL = document.createElement('ul');
taskUL.setAttribute('id', 'task-ul');
listTitle.after(taskUL);

// Update list title


// Add items to task list
function updateTaskList(taskArray) {    
    if (taskArray) {
        const incomplete = taskArray.filter(isIncomplete);
        taskUL.innerText = '';
        if (incomplete.length !== 0) {
            incomplete.forEach(task => addTaskToUL(task));
        } else {
            taskUL.innerText = 'All caught up!'
        };
    } else {
        taskUL.innerText = 'Add some new tasks!'
    };
    
    if (taskArray === tasks || !taskArray) {
        listTitle.innerText = 'Inbox';
    } else {
        listTitle.innerText = startCase(taskArray);
    };   

    function isIncomplete(task) {
        if (task.complete === 'yes') {
            return false;        
        };
        return true;
    };
};

function addTaskToUL(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    
    // Top row
    const itemTop = document.createElement('div');
    itemTop.classList.add('item-top');
    itemTop.innerText = `${task.name}`;
    taskItem.appendChild(itemTop);

    const completeButton = document.createElement('button');
    completeButton.setAttribute('data-index', `${tasks.indexOf(task)}`);
    completeButton.classList.add('complete-button');
    completeButton.innerText = 'Complete';
    completeButton.addEventListener('click', completeTask);
    itemTop.appendChild(completeButton);

    // Bottom row
    const itemBottom = document.createElement('div');
    itemBottom.classList.add('item-bottom');
    const dueDateDiv = document.createElement('div');
    if (task.dueDate) {      
        const [year, month, day] = task.dueDate.substr(0, 10).split('-');
        dueDateDiv.innerText = format(new Date(
            year,
            (month - 1),
            day,
        ), 'P');               
    };

    itemBottom.appendChild(dueDateDiv);
    const projectDiv = document.createElement('div');
    if (!task.project || task.project === 'inbox') {
        projectDiv.innerText = 'Inbox';
    } else {
        projectDiv.innerText = `Project: ${startCase(task.project)}`;
    };
    itemBottom.appendChild(projectDiv);
    taskItem.appendChild(itemBottom);
    
    // Append to ul
    taskUL.appendChild(taskItem);
}

// Create button for adding a new task
const newTaskButtonDiv = document.createElement('div');
newTaskButtonDiv.setAttribute('id', 'new-task-button-div');
taskList.appendChild(newTaskButtonDiv);
const newTaskButton = document.createElement('button');
newTaskButton.setAttribute('id', 'new-task-button');
newTaskButton.classList.add('form-button');
newTaskButton.innerText = 'New Task';
newTaskButton.addEventListener('click', showForm);
newTaskButtonDiv.appendChild(newTaskButton);

function showForm() {
    const taskFormDiv = document.getElementById('task-form-div');
    taskFormDiv.classList.remove('hide');
    newTaskButtonDiv.classList.add('hide');
    document.getElementById('task-name-field').focus();
    const dueDate = document.getElementById('task-date-field');
    const today = new Date().toISOString().slice(0, 10);
    dueDate.value = today;
}

function hideForm(event) {
    const taskFormDiv = document.getElementById('task-form-div');
    taskFormDiv.classList.add('hide');
    newTaskButtonDiv.classList.remove('hide');
    event.preventDefault();
}

// Create task function
function addTask(task) {
    tasks.push(task);
}

// Complete task function
function completeTask(event) {
    const taskIndex = event.currentTarget.dataset.index;
    const completedTask = tasks[taskIndex];
    completedTask.complete = 'yes';
    refreshPage();
}

// Refresh page function
function refreshPage() {
    const page = document.getElementById('list-title').innerText.toLowerCase();
    if (page) {
        const newList = updateProject(page);
        updateTaskList(newList);
    } else {
        updateTaskList(tasks);
    };   
};

// Create form for inputing task
function createForm() {
    // Create hidden div for form
    const taskFormDiv = document.createElement('div');
    taskFormDiv.setAttribute('id', 'task-form-div');
    taskFormDiv.classList.add('hide');
    taskList.appendChild(taskFormDiv);

    // Create actual form
    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'new-task');
    taskForm.setAttribute('action', '');

    // Create task name field
    const nameFieldDiv = document.createElement('div');
    nameFieldDiv.classList.add('form-field');
    taskForm.appendChild(nameFieldDiv);
    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'task-name-field');
    taskNameLabel.innerText = 'Task name';
    taskNameLabel.classList.add('hide');
    nameFieldDiv.appendChild(taskNameLabel);
    const taskName = document.createElement('input');
    taskName.setAttribute('id', 'task-name-field');
    taskName.setAttribute('name', 'task-name');
    taskName.setAttribute('type', 'input');
    taskName.setAttribute('placeholder', 'Task name');
    taskName.setAttribute('autocomplete', 'off');
    taskName.classList.add('borderless-field');
    nameFieldDiv.appendChild(taskName);

    // Create description field
    const descFieldDiv = document.createElement('div');
    descFieldDiv.classList.add('form-field');
    taskForm.appendChild(descFieldDiv);
    const taskDescLabel = document.createElement('label');
    taskDescLabel.setAttribute('for', 'task-desc-field');
    taskDescLabel.innerText = 'Task description';
    taskDescLabel.classList.add('hide');
    descFieldDiv.appendChild(taskDescLabel);
    const taskDesc = document.createElement('input');
    taskDesc.setAttribute('id', 'task-desc-field');
    taskDesc.setAttribute('name', 'task-desc');
    taskDesc.setAttribute('type', 'input');
    taskDesc.setAttribute('placeholder', 'Description');
    taskDesc.setAttribute('autocomplete', 'off');
    taskDesc.classList.add('borderless-field');
    descFieldDiv.appendChild(taskDesc);

    // Create div for date and priority buttons
    const buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('id', 'form-button-div');
    taskForm.appendChild(buttonDiv);

    // Date field
    const dateFieldDiv = document.createElement('div');
    buttonDiv.appendChild(dateFieldDiv);

    const dateFieldLabel = document.createElement('label');
    dateFieldLabel.setAttribute('for', 'task-date-field');
    dateFieldLabel.innerText = 'Due date';
    dateFieldLabel.classList.add('hide');
    dateFieldDiv.appendChild(dateFieldLabel);

    const taskDueDate = document.createElement('input');
    taskDueDate.setAttribute('type', 'date');
    taskDueDate.setAttribute('id', 'task-date-field');
    taskDueDate.setAttribute('name', 'due-date');
    const today = new Date().toISOString().slice(0, 10);
    taskDueDate.setAttribute('min', `${today}`);
    taskDueDate.value = `${today}`;
    dateFieldDiv.appendChild(taskDueDate);

    // Priority field
    const priorityFieldDiv = document.createElement('div');
    priorityFieldDiv.setAttribute('id', 'task-priority-div');

    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.setAttribute('for', 'task-priority-field');
    taskPriorityLabel.innerText = 'Task priority';
    taskPriorityLabel.classList.add('hide');
    priorityFieldDiv.appendChild(taskPriorityLabel);

    const taskPriority = document.createElement('select');
    taskPriority.setAttribute('id', 'task-priority-field');
    taskPriority.setAttribute('name', 'priority');

    const priorityDefault = document.createElement('option');
    priorityDefault.innerText = 'Priority';
    priorityDefault.setAttribute('value', '');
    priorityDefault.selected = 'true';
    priorityDefault.disabled = 'true';
    taskPriority.appendChild(priorityDefault);
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.setAttribute('value', `${priority}`);
        option.innerText = `Priority ${priority}`;
        taskPriority.appendChild(option);
    });
    priorityFieldDiv.appendChild(taskPriority);
    buttonDiv.appendChild(priorityFieldDiv);

    // Create div for project, submit, and cancel buttons
    const formBottom = document.createElement('div');
    formBottom.setAttribute('id', 'form-bottom');
    taskForm.appendChild(formBottom);

    // Project field
    const projectFieldDiv = document.createElement('div');
    formBottom.appendChild(projectFieldDiv);

    const projectFieldLabel = document.createElement('label');
    projectFieldLabel.setAttribute('for', 'task-project-field');
    projectFieldLabel.classList.add('hide');
    projectFieldLabel.innerText = 'Task project';
    projectFieldDiv.appendChild(projectFieldLabel);

    const taskProject = document.createElement('input');
    taskProject.setAttribute('id', 'task-project-field');
    taskProject.setAttribute('name', 'project');
    taskProject.setAttribute('type', 'text');
    taskProject.setAttribute('list', 'projects');
    taskProject.setAttribute('autocomplete', 'off');
    taskProject.setAttribute('placeholder', 'Project');

    const projectList = document.createElement('datalist');
    projectList.setAttribute('id', 'projects');
    projects.forEach(project => {
        const option = document.createElement('option');
        option.innerText = startCase(project);
        projectList.appendChild(option);
    });
    taskProject.appendChild(projectList);

    projectFieldDiv.appendChild(taskProject);

    // Cancel and Submit Buttons
    const bottomButtons = document.createElement('div');
    bottomButtons.setAttribute('id', 'bottom-buttons');
    formBottom.appendChild(bottomButtons);    

    const submit = document.createElement('button');
    submit.setAttribute('id', 'new-task-submit');
    submit.setAttribute('type', 'submit');
    submit.classList.add('form-button');
    submit.innerText = 'Add Task';
    bottomButtons.appendChild(submit);
    taskForm.addEventListener('submit', getTaskData);

    const cancel = document.createElement('button');
    cancel.setAttribute('id', 'new-task-cancel');
    cancel.classList.add('cancel');
    cancel.innerText = 'Cancel';
    cancel.addEventListener('click', hideForm);
    bottomButtons.appendChild(cancel);

    taskFormDiv.appendChild(taskForm);
}

// Get form data
function getTaskData(event) {
    const taskData = document.getElementById('new-task');
    const formData = new FormData(taskData);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('description');
    const taskDate = formData.get('due-date');
    console.log(taskDate);
    let taskPriority = formData.get('priority');
    if (!taskPriority || !priorities.includes(taskPriority)) {
        taskPriority = 4;
    }
    let taskProject = formData.get('project').toLowerCase();
    if (!taskProject) {
        taskProject = 'inbox';
    }
    if (taskProject && !projects.includes(taskProject)) {
        projects.push(taskProject);
        updateProjects();
        updateSidebar();
    }
    const taskComplete = 'no';
    const newTask = new Task(taskName, taskDesc, taskDate, taskPriority, taskProject, taskComplete);
    addTask(newTask);
    refreshPage();
    updateProjects();
    updateSidebar();
    taskData.reset();
    const taskFormDiv = document.getElementById('task-form-div');
    taskFormDiv.classList.add('hide');
    newTaskButtonDiv.classList.remove('hide');
    event.preventDefault();
}

updateProjects();
updateSidebar();
updateTaskList(tasks);
createForm();

