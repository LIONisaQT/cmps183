import sqlite3, datetime
from bottle import route, run, debug, template, static_file, request, redirect

@route('/css/<filename:path>')
def send_css(filename):
    return static_file(filename, root='./css/')

@route('/images/<filename:path>')
def send_images(filename):
    return static_file(filename, root='./images/')

@route('/scripts/<filename:path>')
def send_scripts(filename):
    return static_file(filename, root='./scripts/')

@route('/')
@route('/index')
def index():
    return template('templates/index')

@route('/list')
def list():
    conn = sqlite3.connect('todo.db') # Connect to db
    c = conn.cursor() # Point at each row of db
    query = "SELECT id, title, description, posted, updated, due, status FROM todo "
    filter = request.GET.filter
    if filter == "tbd":
        query += "WHERE status=0 "
    elif filter == "done":
        query += "WHERE status=1 "
    else:
        filter="all"

    c.execute(query) # Get data from that row
    result = c.fetchall() # Store all data into variable
    c.close() # Close pointer
    output = template('templates/list', params=[result, filter]) # Show list.tpl with data
    return output

@route('/new', method='GET') # Needed to get db
@route('/new', method='POST') # Needed to add to db
def new():
    # First time making new task
    if not request.POST.save:
        return template('templates/new')

    title = request.POST.title.strip() # Sets variable to value in text box
    desc = request.POST.description.strip()
    due = request.POST.due.strip()
    time = request.POST.time.strip()

    # Checks if text box is empty
    if not new:
        return '<p><span style="background-color: yellow">Please enter a task</span></p>' + template('templates/new_task.tpl')

    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    currTime = datetime.datetime.now()
    c.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES (?,?,?,?,?,?)", (title, desc, currTime.strftime("%Y-%m-%d %H:%M"), currTime.strftime("%Y-%m-%d %H:%M"), due + " " + time, 0))
    new_id = c.lastrowid
    conn.commit()
    c.close()
    return '<p>Task %s add to database</p><a href="/list">Back</a>' % new_id

@route('/edit/<id>', method='GET')
@route('/edit/<id>', method='POST')
def edit(id):
    if not request.POST.save:
        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("SELECT title, description, due, status FROM todo WHERE id LIKE ?", id)
        cur_data = c.fetchone()

        if cur_data:
            return template('templates/edit_task', id=id, old_title=cur_data[0], old_desc=cur_data[1], old_due=cur_data[2], old_status=cur_data[3], filter=request.params.filter)
        else:
            return '<script>alert("lolwtf")</script>'

    new_title = request.POST.title.strip()
    new_desc = request.POST.desc.strip()
    new_due = request.POST.due.strip()
    new_status = request.POST.status.strip()
    filter = request.POST.filter.strip()

    if not new_title:
        message = '<p><span style="background-color: yellow">Please enter a task</span></p>'
        return message + template('edit_task', id=id, old_title=[""], old_status=new_status, filter=filter)

    new_status = (1 if new_status == 'closed' else 0)

    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    currTime = datetime.datetime.now()
    c.execute("UPDATE todo SET title = ?, description = ?, updated = ?, due = ?, status = ? WHERE id LIKE ?", (new_title, new_desc, currTime.strftime("%Y-%m-%d %H:%M"), new_due, new_status, id))
    conn.commit()
    c.close
    redirect("/list?filter=" + filter)

@route('/delete/<id>', method='GET')
@route('/delete/<id>', method='POST')
def delete(id):
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("DELETE FROM todo WHERE id LIKE ?", (id))
    conn.commit()

    return '<h1>You are deleting task #' + id + '</h1>'

run(port=9000, debug=True, reloader=True)
