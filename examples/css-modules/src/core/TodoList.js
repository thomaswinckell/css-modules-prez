const styles = require('./TodoList.css');

function renderCloseButton() {
    let elem = document.createElement("span");
    elem.className = styles.close;
    elem.innerText = "\u00D7";
    return elem;
}

function renderItem(text) {
    let elem = document.createElement('li');
    elem.className = styles.item;
    elem.innerText = text;
    elem.appendChild(renderCloseButton());
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