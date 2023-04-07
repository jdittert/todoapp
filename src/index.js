import './style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { startCase } from 'lodash';
import Task from './modules/task';

// Instantiate a dummy task
const blank = new Task('name', 'desc', 'date', 'priority', 'project', 'complete');

// Create task array
const tasks = [];

// Prepopulate with test tasks
const taskOne = new Task('To Do App', 'code for Odin Project', '4/12/23', 'high', 'Odin Project', 'no');
tasks.push(taskOne);
const taskTwo = new Task('Lunch', 'eat some healthy food', '4/7/23', 'low', 'life', 'no');
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

// Create sidebar
const sidebar = document.createElement('div');
sidebar.setAttribute('id', 'sidebar');
mainDiv.appendChild(sidebar);

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

// Load task list title
const listTitle = document.createElement('div');
listTitle.setAttribute('id', 'list-title');
listTitle.innerText = 'Inbox';
taskList.appendChild(listTitle);

// Display task list
const taskUL = document.createElement('ul');
taskUL.setAttribute('id', 'task-ul');
listTitle.after(taskUL);

// Add items to task list
function updateTaskList() {
    taskUL.innerText = '';
    tasks.forEach(task => addTaskToUL(task));
}

function addTaskToUL(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    // Top row
    const itemTop = document.createElement('div');
    itemTop.classList.add('item-top');
    itemTop.innerText = `${task.name}`;
    taskItem.appendChild(itemTop);
    // Bottom row
    const itemBottom = document.createElement('div');
    itemBottom.classList.add('item-bottom');
    itemBottom.innerText = `${task.dueDate}`;
    taskItem.appendChild(itemBottom);
    // Append to ul
    taskUL.appendChild(taskItem);
}

// Create task function
function addTask(task) {
    tasks.push(task);
}

// Create form for inputing task
function createForm() {  
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
        fieldLabel.innerText = _.startCase(`${key}`);
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

updateTaskList();
createForm();

