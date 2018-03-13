<head>
  <title>Creating New Task</title>
  <link rel="stylesheet" type="text/css" href="/css/styles.css">
  <meta charset="utf-8">
</head>
<body>
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
        Modified version of Prof. Jullig's new_task.tpl, with my form from homework 2.
      </p>
    </div>
    <div class="info">
      <form action="/new" method="POST">
        Task title:<br />
        <input id="title" type="text" size="60" maxlength="100" name="title"><br />
        Description:<br />
        <textarea id="notes" name="description"></textarea><br />
        Due date:<br />
        <input type="date" name="due"><br /><br />
        <input type="submit" name="save" value="save">
      </form>
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
