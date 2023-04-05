import './style.css';
import Task from './modules/task';

// Instantiate a dummy task
const blank = new Task('name', 'desc', 'date', 'priority', 'complete');

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
    main.appendChild(taskForm);

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
    const taskComplete = formData.get('complete');
    const newTask = new Task(taskName, taskDesc, taskDate, taskPriority, taskComplete);
    addTask(newTask);
    updateTaskList();
    event.preventDefault();
}

// Display task list
const taskList = document.createElement('div');
taskList.setAttribute('id', 'task-list');
const taskUL = document.createElement('ul');
taskUL.setAttribute('id', 'task-ul');
taskList.appendChild(taskUL);

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

// Load DOM elements
document.body.appendChild(main());
const mainDiv = document.getElementById('main');
mainDiv.appendChild(taskList);
createForm();
