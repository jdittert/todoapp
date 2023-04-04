import './style.css';
import Task from './modules/task';

// Instantiate a dummy task
const blank = new Task('name', 'desc', 'date', 'priority', 'complete');

// Create main
function main() {
    const element = document.createElement('main');
    element.setAttribute('id', 'main');
    return element;
}

// Create form for inputing task
function createForm() {
    const main = document.getElementById('main');
    const taskForm = document.createElement('form');
    const keys = Object.getOwnPropertyNames(blank);
    keys.forEach(key => createField(key));
    const submit = document.createElement('button');
    submit.innerText = 'Add Task';
    taskForm.appendChild(submit);
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

// Load DOM elements
document.body.appendChild(main());
createForm();

