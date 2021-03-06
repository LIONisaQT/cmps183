% rows = params[0]
% filter = params[1]

<head>
  <title>List</title>
  <link rel="stylesheet" type="text/css" href="/css/styles.css">
  <meta charset="utf-8">
</head>
<body onload="loadTasks()">
  <div class="grid-container">
    <div class="header" style="text-align: center">
      <div id="title">
        <h1>cmps183: Homework 3</h1>
      </div>
      <div id="navbar">
        <ul class="centerUL">
            <li><a href="index">Home</a></li>
            <li><a href="list">To Do List</a></li>
            <li><a href="new">Make New Task</a></li>
        </ul>
      </div>
    </div>
    <div class="sidebar">
      <h3>Notes</h3>
      <p>
        Modified version of Prof. Jullig's todo.tpl, with my table from homework 2. No filtering by ascending or descending dates implemented. Checkboxes are only truly editable within /edit/id, (un)checking here will not do anything. However, you can filter by (un)finished tasks no problem. Just select which sorting method at the top, and then press "filter".
      </p>
    </div>
    <div class="info">
      <div>
        %allchecked  = "checked" if filter=="all" else ""
        %donechecked = "checked" if filter=="done" else ""
        %tbdchecked  = "checked" if filter=="tbd" else ""

        <form id="filterform" action="/list" method="get">
            <fieldset>
                <legend>Task Filter</legend>
                <input type="radio" name="filter" value="all" {{allchecked}}/>All Tasks
                <input type="radio" name="filter" value="done" {{donechecked}}/>Finished Tasks
                <input type="radio" name="filter" value="tbd" {{tbdchecked}}/>Unfinished Tasks
            </fieldset>
            <br/>
            <input id="filterbtn" type="submit" value="Filter" />
        </form>
      </div>
      <table id="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date posted</th>
            <th>Date modified</th>
            <th>Due date</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          %for row in rows:
          %statuschecked = "checked" if row[6] else ""
          <tr>
            %for i in range(1, len(row) - 1):
            <td>{{row[i]}}</td>
            %end
            <td>
              <a href="edit/{{row[0]}}">Edit</a>
            </td>
            <td>
              <a href="delete/{{row[0]}}">Delete</a>
            </td>
            <td>
              <div>
                <input type="checkbox" name=status value="done" {{statuschecked}} />
              </div>
            </td>
          </tr>
          %end
        </tbody>
      </table>
    </div>
    <div class="footer">
      <ul class="centerUL">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Credits</a></li>
      </ul>
    </div>
  </div>
</body>
