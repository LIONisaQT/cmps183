let recievedTask = localStorage.getItem('newTask'); // New task to be added from form
let taskList = localStorage.getItem('taskList'); // Master list of task
let jsonStr = '{"task": []}'; // Array of tasks in master list

function loadTasks() {
  let newTask = JSON.parse(recievedTask);
  let masterList = JSON.parse(taskList);
  let taskArray = JSON.parse(jsonStr);

  if (newTask === null && masterList === null) { // No master list, no task
    return;
  } else {
    let table = document.getElementById('table');
    if (masterList === null) { // No master list, one incoming task
      taskArray['task'].push(newTask);
      jsonStr = JSON.stringify(taskArray);
      let row = table.insertRow(1);
      let title = row.insertCell(0);
      let notes = row.insertCell(1);
      let dueDate = row.insertCell(2);
      let postDate = row.insertCell(3);
      let updateDate = row.insertCell(4);
      let edit = row.insertCell(5);
      let del = row.insertCell(6);
      let checkbox = row.insertCell(7);
      title.innerHTML = taskArray['task'].title;
      notes.innerHTML = taskArray['task'].notes;
      dueDate.innerHTML = taskArray['task'].dueDate;
      postDate.innerHTML = taskArray['task'].postDate;
      updateDate.innerHTML = taskArray['task'].updateDate;
      del.innerHTML = '<button type="button" onClick="deleteTask(' + 0 + ')">Delete</button>'
      edit.innerHTML = '<button type="button" onClick="editTask(' + 0 + ')">Edit</button>'
      checkbox.innerHTML = '<input type="checkbox">';
    } else {
      // Adding new task to existing master list
      if (recievedTask !== null) { masterList['task'].push(newTask); }
      jsonStr = JSON.stringify(masterList);
      for (let i = 0; i < masterList['task'].length; i++) {
        let row = table.insertRow(i + 1);
        let title = row.insertCell(0);
        let notes = row.insertCell(1);
        let dueDate = row.insertCell(2);
        let postDate = row.insertCell(3);
        let updateDate = row.insertCell(4);
        let edit = row.insertCell(5);
        let del = row.insertCell(6);
        let checkbox = row.insertCell(7);
        title.innerHTML = masterList['task'][i].title;
        notes.innerHTML = masterList['task'][i].notes;
        dueDate.innerHTML = masterList['task'][i].dueDate;
        postDate.innerHTML = masterList['task'][i].postDate;
        updateDate.innerHTML = masterList['task'][i].updateDate;
        del.innerHTML = '<button type="button" onClick="deleteTask(' + i + ')">Delete</button>'
        edit.innerHTML = '<button type="button" onClick="editTask(' + 0 + ')">Edit</button>'
        checkbox.innerHTML = '<input type="checkbox">';
      }
    }
  }

  localStorage.setItem('taskList', jsonStr); // Update array of tasks
  localStorage.removeItem('newTask'); // Remove incoming task since it's been added
  taskList = localStorage.getItem('taskList'); // Update master list
}

// Removes task from task list
function deleteTask(taskNum) {
  let tasks = JSON.parse(taskList); // Convert master list
  tasks['task'].splice(taskNum, 1); // Remove task
  tasks = JSON.stringify(tasks); // Convert master list
  localStorage.setItem('taskList', tasks); // Update master list
  location.reload(); // Reload page
}

// Edits task
function editTask(taskNum) {
  location.reload(); // Reload page
}

// For every task, remove its hidden attribute if it has one
function showAll() {
  for (let i = 1; i < document.getElementById('table').rows.length; i++) {
    if (document.getElementById('table').rows[i].classList.contains("hidden")) {
      document.getElementById('table').rows[i].classList.remove("hidden");
    }
  }
}

// If the task's checkbox is not checked, apply the .hidden class
function showCompleted() {
  showAll(); // Reset list
  for (let i = 1; i < document.getElementById('table').rows.length; i++) {
    let checkbox = document.getElementById('table').rows[i].cells[7];
    if (!checkbox.checked) {
      document.getElementById('table').rows[i].classList.add("hidden");
    }
  }
}

// If the task's checkbox is checked, apply the hidden class
function showToDo() {
  showAll(); // Reset list
  for (let i = 1; i < document.getElementById('table').rows.length; i++) {
    let checkbox = document.getElementById('table').rows[i].cells[7];
    if (checkbox.checked) {
      document.getElementById('table').rows[i].classList.add("hidden");
    }
  }
}
