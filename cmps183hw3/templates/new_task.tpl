<p>Add a new task to the ToDo list:</p>
<form action="/new" method="POST">
  <input type="text" size="100" maxlength="100" name="title">
  <input type="text" size="100" maxlength="100" name="description">
  <input type="date" name="due">
  <input type="time" name="time">
  <input type="submit" name="save" value="save">
</form>
