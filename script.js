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

function confirmEdit(event) {
  let position = event.target.id.split('-')[1];
  let updatedTodo = event.target.previousSibling.value;
  todos[position].todoText = updatedTodo;
  displayTodos();
}

function editTodo(event) {
  let currentTodo = event.target;
  let position = event.target.id.split('-')[1];
  let currentTodoText = event.target.innerHTML;
  let previousElement = event.target.previousElementSibling;
  let editSpace = $('<input/>', {
    id: 'todo-' + position,
    value: currentTodoText,
    class: 'new-todo',
  });
  let submitEditButton = $('<button/>', {
    id: 'submit-' + position,
    text: 'Submit',
    class: 'submit-edit-button'
  });
  let cancelEditButton = $('<button/>', {
    id: 'cancel-' + position,
    text: 'x',
    class: 'cancel-edit-button'
  })

  currentTodo.remove();
  $(`#delete-${position}`).hide();
  editSpace.insertAfter($(previousElement));
  submitEditButton.insertAfter(editSpace);
  cancelEditButton.insertAfter(submitEditButton);
  submitEditButton.click(confirmEdit);
  cancelEditButton.click(displayTodos);
}

function deleteTodo(event) {
  let position = event.target.id.split('-')[1];
  todos.splice(position, 1);
  displayTodos();
}

function toggle(event) {
  let position = event.target.id.split('-')[1];

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
      class: 'toggle-complete',
      id: 'toggle-' + i,
      checked: todos[i].completed,
    });
    let text = $('<div/>', {
      class: 'todo',
      id: 'todo-' + i, 
      text: todos[i].todoText,
    });
    let deleteButton =$('<button/>', {
      text: 'x',
      class: 'delete-button',
      id: 'delete-' + i,
    })
    let todoContainer = $('<li/>', {
      class: 'todo-container',
    });

    toggleArea.click(toggle);
    deleteButton.click(deleteTodo);
    text.click(editTodo);
    todoContainer.append(toggleArea);
    todoContainer.append(text);
    todoContainer.append(deleteButton);
    todoContainer.appendTo($('#todo-list-ul'));
  }

  console.log(todos);
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
