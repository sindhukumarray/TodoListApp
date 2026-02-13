const input = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = input.value.trim();
    const taskPriority = priority.value;

    if (taskText === "") return;

    const li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span class="badge ${taskPriority.toLowerCase()}">${taskPriority}</span>
        <button class="deleteBtn">X</button>
    `;

    // Mark complete
    li.querySelector(".task-text").addEventListener("click", function () {
        li.classList.toggle("completed");
        updateCount();
    });

    // Delete
    li.querySelector(".deleteBtn").addEventListener("click", function () {
        li.classList.add("remove");
        setTimeout(() => {
            li.remove();
            updateCount();
        }, 300);
    });

    taskList.appendChild(li);
    input.value = "";
    updateCount();
}

function updateCount() {
    const all = taskList.children.length;
    const completed = document.querySelectorAll(".completed").length;

    totalTasks.textContent = all;
    completedTasks.textContent = completed;
}

function filterTasks(type) {
    const items = document.querySelectorAll(".task-item");

    items.forEach(item => {
        switch (type) {
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                item.style.display = item.classList.contains("completed") ? "flex" : "none";
                break;
            case "pending":
                item.style.display = !item.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeBtn.textContent = "🌞";
  } else {
    themeBtn.textContent = "🌙";
  }
});
