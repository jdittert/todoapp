/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
import './style.css';
import { startCase } from 'lodash';
import format from 'date-fns/format';
import Storage from './modules/storage';
import Task from './modules/task';
import { isIncomplete, numberOfTasks, todayTasks, updateProject, updateToday } from './modules/arrays';


// Create task and project arrays
let tasks = [];
const initialTasks = Storage.getTasks();
if (!initialTasks) {
    // Prepopulate with test tasks
    const taskOne = new Task('To Do App', 'code for Odin Project', '2023-04-23', '1', 'odin project', 'no');
    tasks.push(taskOne);
    const taskTwo = new Task('Lunch', 'eat some healthy food', '2023-04-07', '3', 'life', 'no');
    tasks.push(taskTwo);
} else {
    tasks = initialTasks;
};

let projects = [];
projects = Storage.getProjects();
if (!projects || projects.length === 0) {
    projects = [];
    updateProjects();
};

const priorities = [1, 2, 3, 4];
const staticPages = ['inbox', 'today'];

// Update project array
function updateProjects() {
    tasks.forEach(task => {
        if (task.project) {
            if (!projects.includes(`${task.project.toLowerCase()}`)) {
                projects.push(`${task.project.toLowerCase()}`);
            }
        }
    });
}

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
sidebar.classList.add('flex-column');
mainDiv.appendChild(sidebar);

// Sidebar collapse
sidebarCollapse.addEventListener('click', toggleSidebar);
function toggleSidebar() {
    sidebar.classList.toggle('flex-column');
    sidebar.classList.toggle('hide');
};

function updateSidebar() {
    // Static sidebar categories
    sidebar.innerText = '';
    const sidebarStatic = document.createElement('div');
    sidebarStatic.setAttribute('id', 'sidebar-static');
    sidebar.appendChild(sidebarStatic);

    // Inbox
    const inboxSide = document.createElement('div');
    inboxSide.setAttribute('id', 'inbox-sidebar');
    sidebarStatic.appendChild(inboxSide);
    const inboxButton = document.createElement('button');
    inboxButton.classList.add('project-button');

    const inboxButtonTitle = document.createElement('div');
    inboxButtonTitle.innerText = 'Inbox';
    inboxButton.appendChild(inboxButtonTitle);

    const inboxButtonNumber = document.createElement('div');
    const activeInbox = numberOfTasks(tasks);
    inboxButtonNumber.innerText = activeInbox;
    inboxButtonNumber.classList.add('project-button-number');
    inboxButton.appendChild(inboxButtonNumber);

    inboxButton.addEventListener('click', () => {updateTaskList(tasks, 'inbox')});
    inboxSide.appendChild(inboxButton);

    const todaySide = document.createElement('div');
    todaySide.setAttribute('id', 'today-sidebar');
    sidebarStatic.appendChild(todaySide);
    const todayButton = document.createElement('button');
    todayButton.classList.add('project-button');

    updateToday(tasks);

    const todayButtonTitle = document.createElement('div');
    todayButtonTitle.innerText = 'Today';
    todayButton.appendChild(todayButtonTitle);

    const todayButtonNumber = document.createElement('div')
    const activeToday = numberOfTasks(todayTasks);
    todayButtonNumber.classList.add('project-button-number');
    todayButtonNumber.innerText = activeToday;
    todayButton.appendChild(todayButtonNumber);

    todayButton.addEventListener('click', () => { updateTaskList(todayTasks, 'today') });
    todaySide.appendChild(todayButton);

    // Add projects to sidebar
    const sidebarProjects = document.createElement('div');
    sidebarProjects.setAttribute('id', 'sidebar-projects');
    sidebar.appendChild(sidebarProjects);

    const projectsTitle = document.createElement('div');
    projectsTitle.setAttribute('id', 'projects-title');
    sidebarProjects.appendChild(projectsTitle);
    projectsTitle.innerText = 'Projects';

    const projectsUL = document.createElement('ul');
    projectsUL.setAttribute('id', 'projects-ul');
    sidebarProjects.appendChild(projectsUL);

    function updateSidebarProjects() {
        projectsUL.innerText = '';
        projects.forEach(project => addToSidebar(project));

        function addToSidebar(project) {
            const projectNameLI = document.createElement('li')
            projectNameLI.setAttribute('id', `${project}`);
            projectsUL.appendChild(projectNameLI);
            const projectButton = document.createElement('button');
            projectButton.classList.add('project-button');
            const projectButtonName = document.createElement('div');
            projectButtonName.innerText = startCase(`${project}`);
            projectButton.appendChild(projectButtonName);

            const projectList = updateProject(tasks, project);
            const projectButtonNumber = document.createElement('div');
            projectButton.appendChild(projectButtonNumber);

            if (projectList) {                
                projectButtonNumber.innerText = numberOfTasks(projectList);
                projectButton.addEventListener('click', () => { updateTaskList(projectList, project) });
                projectNameLI.appendChild(projectButton);
            } else {
                projectButtonNumber.innerText = '0';
            }

            
        }
    };
    updateSidebarProjects();

    // New project button
    const newProjectDiv = document.createElement('li');
    newProjectDiv.setAttribute('id', 'new-project');
    projectsUL.appendChild(newProjectDiv);
    const newProjectButton= document.createElement('button');
    newProjectButton.innerText = 'New Project';
    newProjectButton.classList.add('project-button');
    newProjectDiv.appendChild(newProjectButton);
    newProjectButton.addEventListener('click', showNewProject);

    function showNewProject() {
        const newProjectTest = document.querySelector('input[name="new-project-input"]');
        if (!newProjectTest) {
            const newProjectField = document.createElement('div');
            const newProjectForm = document.createElement('form');
            newProjectForm.classList.add('new-project-form');
            newProjectField.appendChild(newProjectForm);
            const inputDiv = document.createElement('div')
            newProjectForm.appendChild(inputDiv);
            const newProjectInput = document.createElement('input');
            const newProjectLabel = document.createElement('label');
            newProjectLabel.setAttribute('for', 'new-project-input');
            newProjectLabel.setAttribute('display', 'hidden');
            inputDiv.appendChild(newProjectLabel);
            newProjectInput.setAttribute('name', 'new-project-input');
            newProjectInput.setAttribute('id', 'new-project-input');
            newProjectInput.setAttribute('placeholder', 'Project Name');
            newProjectInput.setAttribute('autocomplete', 'off');
            newProjectInput.classList.add('borderless-field');
            inputDiv.appendChild(newProjectInput);
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('new-project-buttons');
            newProjectForm.appendChild(buttonDiv);
            const addProjectButton = document.createElement('button');
            addProjectButton.classList.add('form-button', 'new-project-button');
            addProjectButton.innerText = 'Add Project';
            addProjectButton.setAttribute('type', 'submit');
            buttonDiv.appendChild(addProjectButton);  
            const cancelNewProject = document.createElement('button');
            cancelNewProject.innerText = 'Cancel';
            cancelNewProject.classList.add('cancel-project-button');
            buttonDiv.appendChild(cancelNewProject);  
            newProjectDiv.appendChild(newProjectField);
            document.querySelector('input[name="new-project-input"]').focus();
            newProjectForm.addEventListener('submit', addProject)
            cancelNewProject.addEventListener('click', closeNewProject)
        } else {
            newProjectTest.focus();
        }
    }

    function addProject(event) {
        const project = document.querySelector('input[name="new-project-input"]').value;
        project.trim().toLowerCase();
        if (project) {
            if (!projects.includes(project.toLowerCase())) {
                projects.push(project.toLowerCase());
                refreshPage();
                event.preventDefault();
            }
        } else {
            document.querySelector('input[name="new-project-input"]').focus();
            event.preventDefault();
        }
    }

    function closeNewProject(event) {
        newProjectDiv.innerText = '';
        refreshPage();
        event.preventDefault();
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

// Global list elements
const listTitle = document.createElement('div');
listTitle.setAttribute('id', 'list-title');
taskList.appendChild(listTitle);

// Display task list
const taskUL = document.createElement('ul');
taskUL.setAttribute('id', 'task-ul');
taskUL.classList.add('task-ul');
listTitle.after(taskUL);

// Add items to task list
function updateTaskList(taskArray, project) {
    if (taskArray && taskArray.length !== 0) {
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

    listTitle.innerText = startCase(project);
};

function addTaskToUL(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.classList.add('task-li');
    taskItem.setAttribute('id', `task-${tasks.indexOf(task)}`);
    
    // Top row
    const itemTop = document.createElement('div');
    itemTop.classList.add('item-top');
    taskItem.appendChild(itemTop);

    const itemTopLeft = document.createElement('div');
    itemTopLeft.classList.add('item-top-div');
    itemTop.appendChild(itemTopLeft);

    const itemTopName = document.createElement('div');
    itemTopName.innerText = `${task.name}`;
    itemTopLeft.appendChild(itemTopName);

    const itemTopPriority = document.createElement('div');
    itemTopPriority.classList.add('priority-flag');
    const priorityFlag = document.createElement('img');
    priorityFlag.setAttribute('src', `./images/flag-${task.priority}.svg`);
    priorityFlag.setAttribute('alt', 'Priority flag');
    priorityFlag.classList.add('priority-icon');
    itemTopPriority.appendChild(priorityFlag);
    const priorityNumber = document.createElement('div');
    priorityNumber.innerText = `P${task.priority}`;
    priorityNumber.classList.add(`option-p${task.priority}`, 'priority-number');
    itemTopPriority.appendChild(priorityNumber);
    itemTopLeft.appendChild(itemTopPriority);

    const expandIconDiv = document.createElement('div');
    itemTopLeft.appendChild(expandIconDiv);

    const expandIcon = document.createElement('button');
    expandIcon.classList.add('task-button');
    expandIconDiv.appendChild(expandIcon);

    const expandIconImg = document.createElement('img');
    expandIconImg.setAttribute('src', './images/arrow-expand-down.svg');
    expandIconImg.setAttribute('alt', 'Expand icon');
    expandIconImg.classList.add('task-icon');
    expandIcon.appendChild(expandIconImg);
    expandIcon.classList.add('hide');
    
    taskItem.addEventListener('mouseenter', () => expandIcon.classList.remove('hide'));
    taskItem.addEventListener('mouseleave', () => expandIcon.classList.add('hide'));

    // Edit Button
    const editIconDiv = document.createElement('div');
    itemTopLeft.appendChild(editIconDiv);

    const editIcon = document.createElement('button');
    editIcon.classList.add('task-button');
    editIcon.setAttribute('data-index', `${tasks.indexOf(task)}`);
    editIconDiv.appendChild(editIcon);

    const editIconImg = document.createElement('img');
    editIconImg.setAttribute('src', './images/pencil.svg');
    editIconImg.setAttribute('alt', 'Edit icon');
    editIconImg.classList.add('task-icon');
    editIcon.appendChild(editIconImg);
    editIcon.classList.add('hide');
    
    taskItem.addEventListener('mouseenter', () => editIcon.classList.remove('hide'));
    taskItem.addEventListener('mouseleave', () => editIcon.classList.add('hide'));

    // Delete button
    const deleteIconDiv = document.createElement('div');
    itemTopLeft.appendChild(deleteIconDiv);

    const deleteIcon = document.createElement('button');
    deleteIcon.classList.add('task-button');
    deleteIcon.classList.add('cancel');
    deleteIconDiv.appendChild(deleteIcon);
    
    const deleteIconImg = document.createElement('img');
    deleteIconImg.setAttribute('src', './images/trash-can-outline.svg');
    deleteIconImg.setAttribute('alt', 'Delete icon');
    deleteIconImg.classList.add('task-icon');
    deleteIcon.appendChild(deleteIconImg);
    deleteIcon.setAttribute('data-index', `${tasks.indexOf(task)}`);
    deleteIcon.addEventListener('click', deleteTask);
    deleteIcon.classList.add('hide');

    taskItem.addEventListener('mouseenter', () => deleteIcon.classList.remove('hide'));
    taskItem.addEventListener('mouseleave', () => deleteIcon.classList.add('hide'));

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

    // Hidden description row
    const hiddenDesc = document.createElement('div');
    hiddenDesc.setAttribute('id', `${task.name}-${task.description}`);
    if (task.description) {
        hiddenDesc.innerText = `${task.description}`;
    } else {
        hiddenDesc.innerText = 'Description';
    };    
    hiddenDesc.classList.add('hide', 'task-description-field');
    taskItem.appendChild(hiddenDesc);

    expandIcon.addEventListener('click', () => hiddenDesc.classList.toggle('hide'));
    editIcon.addEventListener('click', editTask);
    
    // Append to ul
    taskUL.appendChild(taskItem);
}

// Create button for adding a new task
const hiddenFormDiv = document.createElement('div');
hiddenFormDiv.setAttribute('id', 'hidden-form-div');
taskList.appendChild(hiddenFormDiv);
const newTaskButtonDiv = document.createElement('div');
newTaskButtonDiv.setAttribute('id', 'new-task-button-div');
newTaskButtonDiv.classList.add('modal');
hiddenFormDiv.appendChild(newTaskButtonDiv);
const newTaskButton = document.createElement('button');
newTaskButton.setAttribute('id', 'new-task-button');
newTaskButton.classList.add('form-button');
newTaskButton.innerText = 'New Task';
newTaskButton.addEventListener('click', showForm);
newTaskButtonDiv.appendChild(newTaskButton);

function showForm() {
    refreshPage();
    const taskFormDiv = document.getElementById('task-form-div');
    taskFormDiv.classList.remove('hide');
    newTaskButtonDiv.classList.add('hide');
    const taskName = document.querySelector('input[name="task-name"]');
    taskName.focus();
    taskName.require = 'true';
    const dueDate = document.querySelector('input[name="due-date"]');
    const today = new Date().toISOString().slice(0, 10);
    dueDate.value = today;
    const taskPriority = document.querySelector('select[name="priority"]');
    const taskOptions = Array.from(taskPriority.options);
    taskOptions[0].selected = 'true';
    const currentPage = listTitle.innerText.toLowerCase();
    const taskProject = document.querySelector('input[name="project"]');
    if (currentPage !== 'inbox' && currentPage !== 'today') {
        taskProject.value = startCase(currentPage);
    } else {
        taskProject.value = null;
    }
    // Event listener for closing form on outside click
    document.addEventListener('click', (event) => {
        const clickInside = document.getElementById('hidden-form-div').contains(event.target);
        if (!clickInside) hideForm();
    });
}

function hideForm() {
    const taskName = document.querySelector('input[name="task-name"]');
    taskName.blur();
    taskName.require = 'false';
    const taskFormDiv = document.getElementById('task-form-div');
    taskFormDiv.classList.add('hide');
    newTaskButtonDiv.classList.remove('hide');    
}

function cancelNewTask(event) {
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

// Edit task function
function editTask(event) {
    refreshPage();
    const taskIndex = event.currentTarget.dataset.index;
    const currentTask = document.getElementById(`task-${taskIndex}`);
    const editForm = createForm(`edit-${taskIndex}`);
    editForm.setAttribute('id', `edit-form-${taskIndex}`);
    editForm.setAttribute('data-index', `${taskIndex}`);
    currentTask.innerText = '';
    currentTask.appendChild(editForm);
    preFillForm(taskIndex);

    function preFillForm(index) {
        const inputs = document.getElementById(`edit-form-${index}`).elements;
        const inputArray = Array.from(inputs);
        const task = tasks[index];
        inputArray[0].value = task.name;
        if (task.description) inputArray[1].value = task.description;
        if (task.dueDate) inputArray[2].value = task.dueDate;
        const editPriorty = editForm.querySelector('select');
        const editOptions = Array.from(editPriorty.options);
        if (task.priority && priorities.includes(+`${task.priority}`)) {
            editOptions[task.priority].selected = 'true';
        }
        if (task.project) inputArray[4].value = startCase(task.project);
    }
}

// Delete task function
function deleteTask(event) {
    const taskIndex = event.currentTarget.dataset.index;
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    };
    refreshPage();
    event.preventDefault();
}

// Refresh page function
function refreshPage() {
    Storage.saveTasks(tasks);
    const tasksTest = Storage.getTasks();
    if (tasksTest) tasks = tasksTest;

    if (projects.length === 0) updateProjects();
    Storage.saveProjects(projects);
    const projectsTest = Storage.getProjects();
    if (projectsTest) projects = projectsTest;

    const currentPage = listTitle.innerText.toLowerCase();  
    if (currentPage && !staticPages.includes(currentPage)) {
        const newList = updateProject(tasks, currentPage);
        if (newList) {updateTaskList(newList, currentPage);
        } else {
        updateTaskList(tasks, 'inbox');
        };
    } else if (currentPage === 'inbox') {
        updateTaskList(tasks, 'inbox');
    } else if (currentPage === 'today') {
        updateToday(tasks);
        updateTaskList(todayTasks, 'today');
    } else {
        updateTaskList(tasks, 'inbox');
    };
    taskFormDiv.classList.add('hide');
    updateSidebar();
};

const taskFormDiv = document.createElement('div');
taskFormDiv.setAttribute('id', 'task-form-div');
taskFormDiv.classList.add('hide', 'modal');
hiddenFormDiv.appendChild(taskFormDiv);

// Create form for inputing task
function createForm(position) { 

    // Create actual form
    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', `new-task-${position}`);
    taskForm.setAttribute('action', '');
    taskForm.classList.add('new-task-form');

    // Create task name field
    const nameFieldDiv = document.createElement('div');
    nameFieldDiv.classList.add('form-field');
    taskForm.appendChild(nameFieldDiv);
    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', `task-name-field-${position}`);
    taskNameLabel.innerText = 'Task name';
    taskNameLabel.classList.add('hide');
    nameFieldDiv.appendChild(taskNameLabel);
    const taskName = document.createElement('input');
    taskName.setAttribute('id', `task-name-field-${position}`);
    taskName.setAttribute('name', 'task-name');
    taskName.setAttribute('type', 'input');
    taskName.setAttribute('placeholder', 'Task name');
    taskName.setAttribute('autocomplete', 'off');
    taskName.required = 'true';
    taskName.classList.add('borderless-field', 'task-name-field');
    nameFieldDiv.appendChild(taskName);

    // Create description field
    const descFieldDiv = document.createElement('div');
    descFieldDiv.classList.add('form-field');
    taskForm.appendChild(descFieldDiv);
    const taskDescLabel = document.createElement('label');
    taskDescLabel.setAttribute('for', `task-desc-field-${position}`);
    taskDescLabel.innerText = 'Task description';
    taskDescLabel.classList.add('hide');
    descFieldDiv.appendChild(taskDescLabel);
    const taskDesc = document.createElement('input');
    taskDesc.setAttribute('id', `task-desc-field-${position}`);
    taskDesc.setAttribute('name', 'task-desc');
    taskDesc.setAttribute('type', 'input');
    taskDesc.setAttribute('placeholder', 'Description');
    taskDesc.setAttribute('autocomplete', 'off');
    taskDesc.classList.add('borderless-field');
    descFieldDiv.appendChild(taskDesc);

    // Create div for date and priority buttons
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('form-button-div');
    taskForm.appendChild(buttonDiv);

    // Date field
    const dateFieldDiv = document.createElement('div');
    buttonDiv.appendChild(dateFieldDiv);

    const dateFieldLabel = document.createElement('label');
    dateFieldLabel.setAttribute('for', `task-date-field-${position}`);
    dateFieldLabel.innerText = 'Due date';
    dateFieldLabel.classList.add('hide');
    dateFieldDiv.appendChild(dateFieldLabel);

    const taskDueDate = document.createElement('input');
    taskDueDate.setAttribute('type', 'date');
    taskDueDate.setAttribute('id', `task-date-field-${position}`);
    taskDueDate.setAttribute('name', 'due-date');
    taskDueDate.classList.add('task-date-field');
    const today = new Date().toISOString().slice(0, 10);
    taskDueDate.value = `${today}`;
    dateFieldDiv.appendChild(taskDueDate);

    // Priority field
    const priorityFieldDiv = document.createElement('div');
    priorityFieldDiv.classList.add('task-priority-div');

    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.setAttribute('for', `task-priority-field-${position}`);
    taskPriorityLabel.innerText = 'Task priority';
    taskPriorityLabel.classList.add('hide');
    priorityFieldDiv.appendChild(taskPriorityLabel);

    const taskPriority = document.createElement('select');
    taskPriority.setAttribute('id', `task-priority-field-${position}`);
    taskPriority.setAttribute('name', 'priority');
    taskPriority.classList.add('task-priority-field');

    const priorityDefault = document.createElement('option');
    priorityDefault.innerText = 'Priority';
    priorityDefault.setAttribute('value', '');
    priorityDefault.selected = 'true';
    priorityDefault.disabled = 'true';
    taskPriority.appendChild(priorityDefault);
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.setAttribute('value', `${priority}`);
        option.classList.add(`option-p${priority}`);
        option.innerText = `Priority ${priority}`;
        taskPriority.appendChild(option);
    });
    priorityFieldDiv.appendChild(taskPriority);
    buttonDiv.appendChild(priorityFieldDiv);

    // Create div for project, submit, and cancel buttons
    const formBottom = document.createElement('div');
    formBottom.classList.add('form-bottom');
    taskForm.appendChild(formBottom);

    // Project field
    const projectFieldDiv = document.createElement('div');
    formBottom.appendChild(projectFieldDiv);

    const projectFieldLabel = document.createElement('label');
    projectFieldLabel.setAttribute('for', `task-project-field-${position}`);
    projectFieldLabel.classList.add('hide');
    projectFieldLabel.innerText = 'Task project';
    projectFieldDiv.appendChild(projectFieldLabel);

    const taskProject = document.createElement('input');
    taskProject.setAttribute('id', `task-project-field-${position}`);
    taskProject.setAttribute('name', 'project');
    taskProject.setAttribute('type', 'text');
    taskProject.setAttribute('list', `projects-${position}`);
    taskProject.setAttribute('autocomplete', 'off');
    taskProject.setAttribute('placeholder', 'Project');
    taskProject.classList.add('task-project-field');
    const currentPage = listTitle.innerText.toLowerCase();
    
    const projectList = document.createElement('datalist');
    projectList.setAttribute('id', `projects-${position}`);
    projects.forEach(project => {
        const option = document.createElement('option');
        option.innerText = startCase(project);
        projectList.appendChild(option);
    });
    if (projects.includes(currentPage)) taskProject.appendChild(projectList);
    projectFieldDiv.appendChild(taskProject);

    // Cancel and Submit Buttons
    const bottomButtons = document.createElement('div');
    bottomButtons.classList.add('bottom-buttons');
    formBottom.appendChild(bottomButtons);    

    const submit = document.createElement('button');
    submit.setAttribute('id', `new-task-submit-${position}`);
    submit.setAttribute('type', 'submit');
    submit.classList.add('form-button');
    if (position === 'hidden') {
        submit.innerText = 'Add Task';
        taskForm.addEventListener('submit', insertTask);
    } else {
        submit.innerText = 'Update Task';
        taskForm.addEventListener('submit', updateTask);
    }
    bottomButtons.appendChild(submit);    

    function insertTask(event) {
        const testTask = getTaskData();
        insertNewTask(testTask, taskForm);
        event.preventDefault();
    }

    function updateTask(event) {
        const testTask = getTaskData();
        const {index} = this.dataset;
        tasks[index] = testTask;
        refreshPage();
        updateProjects();
        updateSidebar();
        event.preventDefault();
    }

    const cancel = document.createElement('button');
    cancel.setAttribute('id', `new-task-cancel-${position}`);
    cancel.classList.add('cancel');
    cancel.innerText = 'Cancel';
    if (position === 'hidden') {
        cancel.addEventListener('click', cancelNewTask);
    } else {
        cancel.addEventListener('click', cancelForm);
    }

    function cancelForm(event) {
        taskName.required = 'false'
        refreshPage();
        event.preventDefault();
    }
    bottomButtons.appendChild(cancel);

    return taskForm;
}

// Get form data
function getTaskData() {
    const taskData = document.querySelector('form');
    const formData = new FormData(taskData);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc');
    const taskDate = formData.get('due-date');
    let taskPriority = +formData.get('priority');
    if (!taskPriority || !priorities.includes(taskPriority)) {
        taskPriority = 4;
    }
    let taskProject = formData.get('project').trim().toLowerCase();
    if (taskProject && taskProject.length !== 0 && !projects.includes(taskProject)) {
        projects.push(taskProject);
        updateProjects();
        updateSidebar();
    } else if (!taskProject || taskProject.length === 0) {
        taskProject = null;
    }
    const taskComplete = 'no';
    const newTask = new Task(taskName, taskDesc, taskDate, taskPriority, taskProject, taskComplete);

    return newTask;
};

function insertNewTask(task, form) {
    addTask(task);
    refreshPage();
    updateProjects();
    updateSidebar();
    form.reset();
    taskFormDiv.classList.add('hide');
    newTaskButtonDiv.classList.remove('hide');
}

// Initiate Website
refreshPage();
const newTaskForm = createForm('hidden');
taskFormDiv.appendChild(newTaskForm);


