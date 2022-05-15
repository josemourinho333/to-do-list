const todos = [
  {todoText: 'One', completed: false},
  {todoText: 'Two', completed: false},
  {todoText: 'Three', completed: false},
];

displayTodos();

function addTodo() {
  todos.push({todoText: $('#add-input').val(), completed: false});
  $('#add-input').val('')
  displayTodos();
}

function editTodo() {
  todos[$('#edit-position-input').val()].todoText = $('#edit-text-input').val();
  $('#edit-position-input').val('');
  $('#edit-text-input').val('')
  displayTodos();
}

function deleteTodo(event) {
  let position = event.target.id;
  todos.splice(position, 1);
  displayTodos();
}

function toggle(event) {
  let position = event.target.id;
  if (todos[position].completed === false) {
    todos[position].completed = true;
  } else {
    todos[position].completed = false;
  }

  displayTodos();
}

function displayTodos() {
  $('#todo-list-ul').empty();
  for (let i = 0; i < todos.length; i++) {
    let toggleArea = $('<input/>', {
      type: 'checkbox',
      class: 'toggle',
      id: i,
    });
    let text = $('<div/>', {
      text: todos[i].todoText,
    });
    let deleteButton =$('<button/>', {
      text: 'x',
      class: 'delete-button',
      id: i,
    })
    let completed = $('<div/>', {
      text: todos[i].completed,
    });
    let todoContainer = $('<li/>', {
      class: 'todo-container',
    });

    toggleArea.click(toggle);
    deleteButton.click(deleteTodo);
    todoContainer.append(toggleArea);
    todoContainer.append(text);
    todoContainer.append(deleteButton);
    todoContainer.append(completed);
    todoContainer.appendTo($('#todo-list-ul'));
  }
}

function toggleAll() {
  let completedTodos = 0;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed === true) {
      completedTodos++;
    }
  }

  if (completedTodos === todos.length) {
    for (let i = 0; i < todos.length; i++) {
      todos[i].completed = false;
    }
  } else {
    for (let i = 0; i < todos.length; i++) {
      todos[i].completed = true;
    }
  }

  displayTodos();
}

$('#toggle-all-button').click(toggleAll);
$('#add-button').click(addTodo);
$('#edit-button').click(editTodo);
// $('#toggle-button').click(toggle)