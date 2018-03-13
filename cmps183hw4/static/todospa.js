const initDocElems = () => {
    return {
        todoList: document.getElementById('todolist'),
        taskTemplate: document.getElementById('task-template').firstElementChild,
        editTemplate: document.getElementById('edit-task-template').firstElementChild,
        newList: document.getElementById('newlist'),
        formCount: 0
    }
};

var docElems;

const init = () => {
    // tasks load asynchronously with rest of init()
    loadTasks();

    // convenience object with references to key DOM objects and the form counter
    docElems = initDocElems();

    // attach event handlers to controls in right sidebar
    // to controls
    document.querySelector('.controls')
        .addEventListener('click', (event) => {
            if (event.target.closest('INPUT.controlbtn') &&
                event.target.closest('INPUT.controlbtn').value == "New task") {
                handleNewTask(event)
            };
            // Filter handling goes here ...
            if (event.target.closest('INPUT.controlbtn') &&
                event.target.closest('INPUT.controlbtn').value == "Filter") {
                handleFilter(event)
            };
        });
    //
    // to new tasks being edited
    document.querySelector('#newlist')
        .addEventListener('click', (event) => {

            // you can remove the diagnostic console.log and alert statements
            console.log("event:");
            console.log(event);
            // alert("Check browser console for console.log messages");

            if (event.target.closest('INPUT.editbtn')) {
                handleNewTaskSave(event);
                postData('/delete/', { 'taskid': taskid })
                    .then(response => {
                        console.log("before reading body of postData response:")
                        console.log(response);

                        message = response.json();

                        console.log("after reading body of postData response:")
                        console.log(response);
                        console.log("message read from response body: ")
                        console.log(message);

                        return message;
                    })
                    .then(reply => {
                        console.log("reply that resolved promise:")
                        console.log(reply);

                        if (reply.error) {
                            // alert("Server Error: " + reply.error)
                        }
                    })
                    // catch errors not caught by server-side application
                    .catch(error => console.log(error))
            };

            if (event.target.closest('INPUT.deletebtn')) {
                handleNewTaskCancel(event)
            };

        });

    document.querySelector('#todolist')
        .addEventListener('click', (event) => {
            if (event.target.closest('INPUT.status')) {
                console.log("task checked? " + event.target.checked);
                status = (event.target.checked ? "done" : "tbd");
                console.log('status: ' + status);

                taskid = event.target.closest('SECTION.todoitem').children[0].value;
                console.log('taskid: ' + taskid);

                postData('/status/update', { 'taskid': taskid, 'status': status })
                    .then(response => {
                        console.log("before reading body of postData response:")
                        console.log(response);

                        message = response.json();

                        console.log("after reading body of postData response:")
                        console.log(response);
                        console.log("message read from response body: ")
                        console.log(message);

                        return message;
                    })
                    .then(reply => {
                        console.log("reply that resolved promise:")
                        console.log(reply);

                        if (reply.error) {
                            // alert("Server Error: " + reply.error)
                        }
                    })
                    // catch errors not caught by server-side application
                    .catch(error => console.log(error))
            };
            // addition eventListeners go here for clicks of buttons
            // Edit, Delete
            // Save and Cancel (these on the form created click on Edit)
            if (event.target.closest('INPUT.deletebtn')) {
                taskid = event.target.closest('SECTION.todoitem').children[0].value;
                console.log('taskid: ' + taskid);

                postData('/delete/', { 'taskid': taskid })
                    .then(response => {
                        console.log("before reading body of postData response:")
                        console.log(response);

                        message = response.json();

                        console.log("after reading body of postData response:")
                        console.log(response);
                        console.log("message read from response body: ")
                        console.log(message);

                        return message;
                    })
                    .then(reply => {
                        console.log("reply that resolved promise:")
                        console.log(reply);

                        if (reply.error) {
                            // alert("Server Error: " + reply.error)
                        }
                    })
                    // catch errors not caught by server-side application
                    .catch(error => console.log(error))
                var taskFormEl = event.target.closest('section.todoitem');
                taskFormEl.parentNode.removeChild(taskFormEl);
            }

            if (event.target.closest('INPUT.editbtn')) {
                taskid = event.target.closest('SECTION.todoitem').children[0].value;
                taskdesc = event.target.closest('SECTION.todoitem').getElementsByClassName('taskdescription');
                status = event.target.closest('SECTION.todoitem').getElementsByClassName("itembuttons")[0].getElementsByTagName("input")[0].checked;
                let desc;
                for (var item of taskdesc) {
                    desc = item.innerHTML;
                }
                console.log('taskid: ' + taskid);
                console.log('taskdesc: ' + desc);
                console.log('status: ' + status);

                handleEditTask(event, taskid, desc, status);

                postData('/status/update', { 'taskid': taskid, 'taskdesc': desc, 'status': status })
                    .then(response => {
                        console.log("before reading body of postData response:")
                        console.log(response);

                        message = response.json();

                        console.log("after reading body of postData response:")
                        console.log(response);
                        console.log("message read from response body: ")
                        console.log(message);

                        return message;
                    })
                    .then(reply => {
                        console.log("reply that resolved promise:")
                        console.log(reply);

                        if (reply.error) {
                            // alert("Server Error: " + reply.error)
                        }
                    })
                    // catch errors not caught by server-side application
                    .catch(error => console.log(error))

                if (event.target.closest('INPUT.editbtn')) {

                }
                // var taskFormEl = event.target.closest('section.todoitem');
                // taskFormEl.parentNode.removeChild(taskFormEl);
            }
        });

};

const loadTasks = () => {
    getTasks("all")
        .then(rsp => {
            payload = rsp.json();
            return payload
        })
        .then(tasks => {
            console.log("resolving promise in loadTasks response:")
            console.log(tasks);
            createTaskElements(tasks);
        })
};

const getTasks = (filter) => {
    return fetch("/tasks/" + filter, {
                // set headers to let server know format of
                // request and response bodies
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
}

const putTask = (task) => {
    console.log("from putTask, task:");
    console.log(task);
    return fetch('/task/new', {

        // represent JS object as a string
        body: JSON.stringify(task),

        // set headers to let server know format of
        // request and response bodies
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },

        // in the ReST spirit method should be PUT
        // but bottle does not support HTTP verb PUT
        method: 'POST'
    })
}

const postTask = (task) => {
    console.log("from postTask, task:");
    console.log(task);
    return postData('/task/update/', task)
}

function postData(url, jsondata) {
    return fetch(url, {
        body: JSON.stringify(jsondata),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        method: 'POST'
    })
}

// functions for building and manipulating DOM

const createTaskElements = (taskListData) => {
    console.log("from createTaskElements: creating task elements");
    taskListData.forEach(createAndAppendTaskElement)
}

const createTaskElement = (task) => {
    // cloneNode(true) makes a deep clone (as opposed to shallow clone)
    var taskel = docElems.taskTemplate.cloneNode(true);
    updateTaskElement(task, taskel);
    return taskel
};

const updateTaskElement = (task, taskel) => {
    setTaskId(taskel, task.taskid);
    setTaskDescription(taskel, task.taskdescription);
    setStatus(taskel, task.status);
}

const appendTaskElement = (taskel) => {
        docElems.todoList.appendChild(taskel);
}

// poor (wo)man's function composition
const createAndAppendTaskElement = (taskel) => {
    appendTaskElement(createTaskElement(taskel))
}

const setTaskId = (taskel, taskid) => {
    var  taskidEl = taskel.querySelector('.taskid');
    taskidEl.value = taskid;
};

const getTaskId = (taskel) => {
    var taskidEl = taskel.querySelector('.taskid');
    return taskidEl.value
}

const setTaskDescription = (taskel, taskdescription) => {
    var taskDescriptionEl = taskel.querySelector('.taskdescription');
    taskDescriptionEl.innerHTML = taskdescription;
}

const getTaskFormDescription = (taskel) => {
    var taskDescriptionEl = taskel.querySelector('.taskdescription');
    return taskDescriptionEl.firstElementChild.value
}

const getTaskDescription = (taskel) => {
    var taskDescriptionEl = taskel.querySelector('.taskdescription');
    return taskDescriptionEl.innerHTML
}

const setStatus = (taskel, status) => {
    var taskStatusEl = taskel.querySelector('.status');
    if (status === "done") {
        taskStatusEl.checked = true;
    }
}

const getStatus = (taskel) => {
    var taskStatusEl = taskel.querySelector('.status');
    return (taskStatusEl.checked ? "done" : "tbd")
}

const editNewTask = () => {
    var taskFormEl = docElems.editTemplate.cloneNode(true);
    setFormId(taskFormEl);
    docElems.newList.appendChild(taskFormEl);
}

const editTask = (taskid, desc, status) => {
    var taskFormEl = docElems.editTemplate.cloneNode(true);
    editFormId(taskFormEl);
    taskFormEl.getElementsByClassName("taskdescription")[0].getElementsByTagName("textarea")[0].value = desc;
    if (status === "true") {
        taskFormEl.getElementsByClassName("itembuttons")[0].getElementsByTagName("input")[0].checked = true;
    }
    docElems.newList.appendChild(taskFormEl);
}

function showAll() {
    for (let i = 0; i < document.getElementsByClassName("todoitem").length; i++) {
        document.getElementsByClassName("todoitem")[i].style = "";
    }
}

function showDone() {
    for (let i = 0; i < document.getElementsByClassName("todoitem").length; i++) {
        if (!document.getElementsByClassName("todoitem")[i].getElementsByClassName("itembuttons")[0].getElementsByTagName("input")[0].checked) {
            document.getElementsByClassName("todoitem")[i].style = "display: none";
        }
    }
}

function showTbd() {
    for (let i = 0; i < document.getElementsByClassName("todoitem").length; i++) {
        if (document.getElementsByClassName("todoitem")[i].getElementsByClassName("itembuttons")[0].getElementsByTagName("input")[0].checked) {
            document.getElementsByClassName("todoitem")[i].style = "display: none";
        }
    }
}

const filterTasks = () => {
    let filter = document.querySelector("#filterform").getElementsByTagName("input")[1].checked;
    getTasks("all")
        .then(rsp => {
            payload = rsp.json();
            return payload
        })
        .then(tasks => {
            console.log("resolving promise in loadTasks response:")
            console.log(tasks);
            // Go through every task in todolist
            showAll();
            if (document.querySelector("#filterform").getElementsByTagName("input")[0].checked) {
                showAll();
            } else if (document.querySelector("#filterform").getElementsByTagName("input")[1].checked) {
                showDone();
            } else if (document.querySelector("#filterform").getElementsByTagName("input")[2].checked) {
                showTbd();
            }
        });
    event.preventDefault(); // Prevent page from refreshing
}

const setFormId = (taskFormEl) => {

    // create unique (within DOM) form id
    docElems.formCount += 1;
    formid = "form-" + docElems.formCount;
    console.log(formid);

    // set form id in form elements and form
    taskFormEl.querySelector('.taskid').form = formid;
    taskFormEl.querySelector('.taskdescription').firstElementChild.form = formid;
    taskFormEl.querySelector('.status').form = formid;
    taskFormEl.querySelector('.editbtn').form = formid;
    taskFormEl.querySelector('FORM').id = formid;
}

const editFormId = (taskFormEl) => {
    // console.log(taskFormEl);
}

// event handling functions
const handleFilter = (event) => {
    console.log("handle filter");
    filterTasks();
}

const handleNewTask = (event) => {
    editNewTask();
}

const handleEditTask = (event, taskid, desc, status) => {
    editTask(taskid, desc, status);
}

const handleNewTaskSave = (event) => {
    var taskFormEl = event.target.closest('section.todoitem');
    task = {
        taskdescription: getTaskFormDescription(taskFormEl),
        status: getStatus(taskFormEl)
    };
    putTask(task)
        .then(rsp => {
            console.log("before reading putTask response body");
            console.log(rsp);
            payload = rsp.json();
            console.log("after reading putTask response body");
            console.log(rsp);
            console.log("payload:");
            console.log(payload);
            return payload
        })
        .then(task => {
            console.log("task resolving promise:")
            console.log(task);
            createTaskElement(task);
            taskFormEl.remove();
        })
}

const handleNewTaskCancel = (event) => {
    var taskFormEl = event.target.closest('section.todoitem');
    taskFormEl.remove()
}

init();