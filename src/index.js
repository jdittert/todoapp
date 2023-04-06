import './style.css';
import Task from './modules/task';

// Instantiate a dummy task
const blank = new Task('name', 'desc', 'date', 'priority', 'project', 'complete');

// Create task array
const tasks = [];

// Create main
function main() {
    const element = document.createElement('main');
    element.setAttribute('id', 'main');
    return element;
}

// Create task function
function addTask(task) {
    tasks.push(task);
    console.log(tasks);
}

// Create form for inputing task
function createForm() {
    const main = document.getElementById('main');    
    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'new-task');
    taskForm.setAttribute('action', '');
    const keys = Object.getOwnPropertyNames(blank);
    keys.forEach(key => createField(key));
    const submit = document.createElement('button');
    submit.setAttribute('id', 'new-task-submit');
    submit.setAttribute('type', 'submit');
    submit.innerText = 'Add Task';
    taskForm.appendChild(submit);
    taskForm.addEventListener('submit', getTaskData);    
    taskList.appendChild(taskForm);

    function createField(key) {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('form-field');
        const fieldLabel = document.createElement('label');
        fieldLabel.setAttribute('for', `${key}`);
        fieldLabel.innerText = `${key}`;
        fieldDiv.appendChild(fieldLabel);
        const field = document.createElement('input');
        field.setAttribute('id', `${key}`);
        field.setAttribute('name', `${key}`);
        field.setAttribute('type', 'text');
        fieldDiv.appendChild(field);
        taskForm.appendChild(fieldDiv);
    };
}

// Get form data
function getTaskData(event) {
    const taskData = document.getElementById('new-task');
    const formData = new FormData(taskData);
    console.log(formData);
    const taskName = formData.get('name');
    const taskDesc = formData.get('description');
    const taskDate = formData.get('dueDate');
    const taskPriority = formData.get('priority');
    const taskProject = formData.get('project');
    const taskComplete = formData.get('complete');
    const newTask = new Task(taskName, taskDesc, taskDate, taskPriority, taskProject, taskComplete);
    addTask(newTask);
    updateTaskList();
    taskData.reset();
    event.preventDefault();
}

// Display task list
const taskList = document.createElement('div');
taskList.setAttribute('id', 'task-list');
const taskUL = document.createElement('ul');
taskUL.setAttribute('id', 'task-ul');

// Populate taskUL
function updateTaskList() {
    taskUL.innerText = '';
    tasks.forEach(task => addTaskToUL(task));
}

function addTaskToUL(task) {
    const taskItem = document.createElement('li');
    const keys = Object.values(task);
    keys.forEach(key => createTaskDiv(key));
    taskUL.appendChild(taskItem);

    function createTaskDiv(value) {
        const keyDiv = document.createElement('div');
        keyDiv.innerText = `${value}`
        taskItem.appendChild(keyDiv);
    }
}

// Load page main
document.body.appendChild(main());
const mainDiv = document.getElementById('main');

// Create basic page layout
const header = document.createElement('div');
header.setAttribute('id', 'header');
mainDiv.appendChild(header);
const sidebar = document.createElement('div');
sidebar.setAttribute('id', 'sidebar');
mainDiv.appendChild(sidebar);
const taskSection = document.createElement('div');
taskSection.setAttribute('id', 'task-section');
mainDiv.appendChild(taskSection);

// Display main section
const taskWrapper = document.createElement('div');
taskWrapper.setAttribute('id', 'task-wrapper');
taskSection.appendChild(taskWrapper);
const rightBumper = document.createElement('div');
taskWrapper.appendChild(rightBumper);
const listTitle = document.createElement('div');
listTitle.setAttribute('id', 'list-title');
listTitle.innerText = 'Inbox';
taskList.appendChild(listTitle);
listTitle.after(taskUL);
taskWrapper.appendChild(taskList);
const leftBumper = document.createElement('div');
taskWrapper.appendChild(leftBumper);

createForm();

