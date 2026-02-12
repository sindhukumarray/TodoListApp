const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTodo(taskText);
    input.value = '';
  }
});

function addTodo(text) {
  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };
  todos.push(todo);
  renderTodos();
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.style.cursor = 'pointer';
    span.addEventListener('click', () => toggleComplete(todo.id));

    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.style.background = '#ef4444';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.padding = '0.3rem 0.6rem';
    btn.style.borderRadius = '4px';
    btn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function toggleComplete(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}
