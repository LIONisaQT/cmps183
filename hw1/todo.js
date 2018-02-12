// Get every task regardless of status
var tasks = document.getElementsByClassName('task');

// For every task, remove its hidden attribute if it has one
function showAll() {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].classList.contains("hidden")) {
      tasks[i].classList.remove("hidden");
    }
  }
}

// If the task's checkbox is not checked, apply the .hidden class
function showCompleted() {
  showAll(); // Reset list
  for (let i = 0; i < tasks.length; i++) {
    let checkbox = tasks[i].getElementsByClassName('taskCheckbox');
    if (!checkbox[0].checked) {
      tasks[i].classList.add("hidden");
    }
  }
}

// If the task's checkbox is checked, apply the hidden class
function showToDo() {
  showAll(); // Reset list
  for (let i = 0; i < tasks.length; i++) {
    let checkbox = tasks[i].getElementsByClassName('taskCheckbox');
    if (checkbox[0].checked) {
      tasks[i].classList.add("hidden");
    }
  }
}
