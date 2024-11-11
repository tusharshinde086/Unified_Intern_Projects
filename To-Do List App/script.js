// Selectors for task input and task list
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // Get and trim input value
    if (taskText === "") {  // Validate input
        alert("Please enter a task!");
        return;
    }
    
    // Create a task element
    const taskItem = document.createElement("li");

    // Checkbox to mark task as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = () => {
        taskItem.classList.toggle("completed");
        saveTasks();
    };

    // Task content span
    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;

    // Edit button for editing tasks
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(taskContent);

    // Delete button to remove tasks
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        taskItem.remove();
        saveTasks();
    };

    // Append elements to task item
    taskItem.append(checkbox, taskContent, editBtn, deleteBtn);
    taskList.appendChild(taskItem);  // Add task item to the list

    saveTasks();  // Save updated list to local storage
    taskInput.value = ""; // Clear input after adding
}

// Function to edit an existing task
function editTask(taskContent) {
    const newText = prompt("Edit task:", taskContent.textContent);
    if (newText !== null && newText.trim() !== "") {
        taskContent.textContent = newText.trim();
        saveTasks();
    }
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(item => {
        tasks.push({
            text: item.querySelector("span").textContent,
            completed: item.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Store in local storage
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        if (task.completed) taskItem.classList.add("completed");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        };

        const taskContent = document.createElement("span");
        taskContent.textContent = task.text;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(taskContent);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            taskItem.remove();
            saveTasks();
        };

        taskItem.append(checkbox, taskContent, editBtn, deleteBtn);
        taskList.appendChild(taskItem);
    });
}
