var form = document.getElementById('form'); // Get form
var task = {};

function sendData() {
  // Get form data
  let form = document.getElementById('form');
  let title = form.elements[0].value;
  let notes = form.elements[1].value;
  let dueDate = form.elements[2].value;
  localStorage.setItem('newTask', addNewTask(title, notes, dueDate));
}

// Sets values of new task
function addNewTask(title, notes, dueDate) {
  task = JSON.stringify({
    title: title,
    notes: notes,
    dueDate: dueDate,
    postDate: getPostDate(),
    updateDate: getPostDate(),
  });
  return task;
}

function getPostDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}
