const styles = require('./TodoList.css');

function renderItem(text) {
    let elem = document.createElement('li');
    elem.innerText = text;
    elem.className = styles.item;
    return elem;
}

function renderTodoList(list) {
    let elem = document.createElement('ul');
    elem.className = styles.root;

    list.forEach(text => {
        elem.appendChild(renderItem(text));
    });

    return elem;
}


module.exports = {
    renderTodoList
};