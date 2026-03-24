let list = [['Breakfast', '2025-02-01']];

toRenderToDoList();

// event listeners
const addButton = document.querySelector('.js-add-button-event');
addButton.addEventListener('click', addTodoWork);

function toRenderToDoList() {
    let todoListHTML = '';
    list.forEach(function (value, index) {
        const todoListWork =
            `<div>
        ${value[0]}
        </div>

        <div>
        ${value[1]}
        </div>

        <button class="delete-todo-button js-delete-button-event">
        Delete
        </button>
        `;

        todoListHTML += todoListWork;
    });

    document.querySelector('.todoList-div-container').innerHTML = todoListHTML;

    // it will give me the list of all element with this class not only the first one
    const listDeleteButton = document.querySelectorAll('.js-delete-button-event');
    listDeleteButton.forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            list.splice(index, 1);
            toRenderToDoList();
        })
    });
}

Z
function addTodoWork() {
    const toDoList = document.querySelector('.js-input-value-box');
    const toDoListDate = document.querySelector('.js-todoList-date');
    const val = [toDoList.value, toDoListDate.value];
    list.push(val);
    toDoList.value = '';
    toDoListDate.value = '';
    toRenderToDoList();
}