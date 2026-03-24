let list = [['Hello', '2025-02-01']];

toRenderToDoList();

function toRenderToDoList() {
    let todoListHTML = '';
    for (let i = 0; i < list.length; i++) {
        const todoListWork = 
        `<div>
        ${list[i][0]}
        </div>

        <div>
        ${list[i][1]}
        </div>

        <button class="delete-todo-button" onclick="
        list.splice(${i}, 1);
        toRenderToDoList();
        ">
        Delete
        </button>
        `;
        todoListHTML += todoListWork;
    }

    document.querySelector('.todoList-div-container').innerHTML = todoListHTML;
}


function addTodoWork() {
    const toDoList = document.querySelector('.js-input-value-box');
    const toDoListDate = document.querySelector('.js-todoList-date');
    const val = [toDoList.value, toDoListDate.value];
    list.push(val);
    toDoList.value = '';
    toDoListDate.value = '';
    toRenderToDoList();
}