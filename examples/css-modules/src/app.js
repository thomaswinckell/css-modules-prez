require('./core/Theme.css');

const TodoList = require('./core/TodoList');


const list = [
    'Do a talk @ JsMeetup',
    'Work',
    'Work more',
    'Be rich',
    'Be rich without working',
];

let target = document.getElementById('app');

target.appendChild(
    TodoList.renderTodoList(list)
);