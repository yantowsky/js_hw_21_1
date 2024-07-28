const addTodoButton = $('.form__btn');
const todosWrapper = $('.js--todos-wrapper');

addTodoButton.on('click', () => {
    const valueInputTodo = $('.form__input').val();
    valueInputTodo && addTask(valueInputTodo, false);
});

todosWrapper.on('click', (event) => {
    const valueTodoItem = $(event.target).closest('.todo-item').attr('value');
    $(event.target).hasClass('todo-item__delete') && delTask(valueTodoItem);
    $(event.target).hasClass('todo-item__description') && getModal(valueTodoItem);
    $(event.target).is(':checkbox') && stateCheckBox(valueTodoItem, event);
});

const todoList = JSON.parse(localStorage.getItem('todo_list')) || [];

function addTask(string, boolean) {
    todoList.push({
        id: Date.now(),
        checkbox: boolean,
        task: string
    });
    setTodoList(todoList);
    getTodoList();
}

function delTask(value) {
    todoList.forEach((element, index) => {
        element.id == value && todoList.splice([index], 1);
        setTodoList(todoList);
        getTodoList();
    });
}

function stateCheckBox(value, event) {
    $(event.target).closest('.todo-item').toggleClass('todo-item--checked');

    const stateCheckBox = event.target.checked;

    todoList.forEach(element => {
        element.id == value && (element.checkbox = stateCheckBox);
        setTodoList(todoList);
    });
}

function getModal(value) {
    const modalBody = $('.modal-body').css('text-decoration', 'none');

    todoList.forEach(element => {
        element.id == value && element.checkbox === true && modalBody.css('text-decoration', 'line-through');
        element.id == value && modalBody.text(element.task);
    });
}

function setTodoList(todoList) {
    const newTodo = JSON.stringify(todoList);
    localStorage.setItem('todo_list', newTodo);
}

function getTodoList() {
    todosWrapper.html('');

    todoList.forEach(element => {
        const todoItem = $('<li>').attr({ 'class': 'todo-item', 'value': element.id });
        const checkBoxForTodoItem = $('<input>').attr({ 'type': 'checkbox' });
        const spanForTodoItem = $('<span>').attr({
            'class': 'todo-item__description',
            'data-bs-toggle': 'modal',
            'data-bs-target': '#exampleModal'
        }).text(element.task);
        const delButtonForTodoItem = $('<button>').attr({ 'class': 'todo-item__delete' }).text('Видалити');

        element.checkbox &&
            (todoItem.toggleClass('todo-item--checked'),
                checkBoxForTodoItem.prop('checked', element.checkbox));

        todoItem.append(checkBoxForTodoItem, spanForTodoItem, delButtonForTodoItem);
        todosWrapper.append(todoItem);
    });
}
getTodoList();