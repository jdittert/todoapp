/* eslint-disable no-use-before-define */
import './style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { startCase } from 'lodash';
import Task from './modules/task';

// Instantiate a dummy task
const blank = new Task('name', 'desc', 'date', 'priority', 'project', 'complete');

// Create task and project arrays
const tasks = [];
const projects = ['inbox', 'today']

// Update project array
function updateProjects() {
    tasks.forEach(task => {
        if (!projects.includes(`${task.project.toLowerCase()}`)) {
            projects.push(`${task.project.toLowerCase()}`);
        }
    })
}

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

// Add projects to sidebar
function updateSidebar() {
    projects.forEach(project => addToSidebar(project));

    function addToSidebar(project) {
        const projectNameDiv = document.createElement('div')
        projectNameDiv.setAttribute('id', `${project}`);
        projectNameDiv.innerText = _.startCase(`${project}`);
        sidebar.appendChild(projectNameDiv);
    }
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
    const incomplete = tasks.filter(isIncomplete);
    taskUL.innerText = '';
    if (incomplete.length !== 0) {
        incomplete.forEach(task => addTaskToUL(task));
    } else {
        taskUL.innerText = 'All caught up!'
    };

    function isIncomplete(task) {
        if (task.complete === 'yes') {
            return false;        
        };
        return true;
    };
}

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
    dueDateDiv.innerText = `${task.dueDate}`;
    itemBottom.appendChild(dueDateDiv);
    const projectDiv = document.createElement('div');
    projectDiv.innerText = `Project: ${task.project}`;
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
}

// Create task function
function addTask(task) {
    tasks.push(task);
}

// Complete task function
function completeTask(event) {
    const taskIndex = event.currentTarget.dataset.index;
    tasks[taskIndex].complete = 'yes';
    updateTaskList();
}

// Create form for inputing task
function createForm() {
    const taskFormDiv = document.createElement('div');
    taskFormDiv.setAttribute('id', 'task-form-div');
    taskFormDiv.classList.add('hide');
    taskList.appendChild(taskFormDiv);
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
    taskFormDiv.appendChild(taskForm);

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
    const taskName = formData.get('name');
    const taskDesc = formData.get('description');
    const taskDate = formData.get('dueDate');
    const taskPriority = formData.get('priority');
    let taskProject = formData.get('project');
    if (!taskProject) {
        taskProject = 'Inbox';
    }
    const taskComplete = 'no';
    const newTask = new Task(taskName, taskDesc, taskDate, taskPriority, taskProject, taskComplete);
    addTask(newTask);
    updateTaskList();
    taskData.reset();
    const taskFormDiv = document.getElementById('task-form-div');
    taskFormDiv.classList.add('hide');
    newTaskButtonDiv.classList.remove('hide');
    event.preventDefault();
}

updateProjects();
updateSidebar();
updateTaskList();
createForm();

