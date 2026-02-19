const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

renderTasks();

function handleTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    if (editIndex === null) {
        tasks.push({ text: text, completed: false });
    } else {

        tasks[editIndex].text = text;
        editIndex = null;
        addBtn.textContent = "Add";
    }

    saveTasks();
    renderTasks();
    taskInput.value = "";
}

addBtn.addEventListener("click", handleTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleTask();
    }
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");

        if (task.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const btnContainer = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", function () {
            taskInput.value = task.text;
            editIndex = index;
            addBtn.textContent = "Update";
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(btnContainer);
        taskList.appendChild(li);
    });
}

clearAllBtn.addEventListener("click", function () {
    tasks = [];
    saveTasks();
    renderTasks();
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
