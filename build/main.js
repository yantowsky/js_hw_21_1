"use strict";

var addTodoButton = $('.form__btn');
var todosWrapper = $('.js--todos-wrapper');
addTodoButton.on('click', function () {
  var valueInputTodo = $('.form__input').val();
  valueInputTodo && addTask(valueInputTodo, false);
});
todosWrapper.on('click', function (event) {
  var valueTodoItem = $(event.target).closest('.todo-item').attr('value');
  $(event.target).hasClass('todo-item__delete') && delTask(valueTodoItem);
  $(event.target).hasClass('todo-item__description') && getModal(valueTodoItem);
  $(event.target).is(':checkbox') && stateCheckBox(valueTodoItem, event);
});
var todoList = JSON.parse(localStorage.getItem('todo_list')) || [];
function addTask(string, _boolean) {
  todoList.push({
    id: Date.now(),
    checkbox: _boolean,
    task: string
  });
  setTodoList(todoList);
  getTodoList();
}
function delTask(value) {
  todoList.forEach(function (element, index) {
    element.id == value && todoList.splice([index], 1);
    setTodoList(todoList);
    getTodoList();
  });
}
function stateCheckBox(value, event) {
  $(event.target).closest('.todo-item').toggleClass('todo-item--checked');
  var stateCheckBox = event.target.checked;
  todoList.forEach(function (element) {
    element.id == value && (element.checkbox = stateCheckBox);
    setTodoList(todoList);
  });
}
function getModal(value) {
  var modalBody = $('.modal-body').css('text-decoration', 'none');
  todoList.forEach(function (element) {
    element.id == value && element.checkbox === true && modalBody.css('text-decoration', 'line-through');
    element.id == value && modalBody.text(element.task);
  });
}
function setTodoList(todoList) {
  var newTodo = JSON.stringify(todoList);
  localStorage.setItem('todo_list', newTodo);
}
function getTodoList() {
  todosWrapper.html('');
  todoList.forEach(function (element) {
    var todoItem = $('<li>').attr({
      'class': 'todo-item',
      'value': element.id
    });
    var checkBoxForTodoItem = $('<input>').attr({
      'type': 'checkbox'
    });
    var spanForTodoItem = $('<span>').attr({
      'class': 'todo-item__description',
      'data-bs-toggle': 'modal',
      'data-bs-target': '#exampleModal'
    }).text(element.task);
    var delButtonForTodoItem = $('<button>').attr({
      'class': 'todo-item__delete'
    }).text('Видалити');
    element.checkbox && (todoItem.toggleClass('todo-item--checked'), checkBoxForTodoItem.prop('checked', element.checkbox));
    todoItem.append(checkBoxForTodoItem, spanForTodoItem, delButtonForTodoItem);
    todosWrapper.append(todoItem);
  });
}
getTodoList();