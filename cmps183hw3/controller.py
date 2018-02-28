import sqlite3, datetime
from bottle import route, run, debug, template, static_file, request, redirect

# Set directories for static files
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

    # Get filter from list page
    filter = request.GET.filter
    if filter == "tbd":
        query += "WHERE status=0 "
    elif filter == "done":
        query += "WHERE status=1 "
    else:
        filter="all"

    c.execute(query) # Search database for everything that matches filter, returns queries
    result = c.fetchall() # Store queries
    c.close() # Close pointer

    # Show list with filtered data
    output = template('templates/list', params=[result, filter])
    return output

@route('/new', method='GET') # Needed to get db
@route('/new', method='POST') # Needed to add to db
def new():
    # First time making new task
    if not request.POST.save:
        return template('templates/new')

    # Sets variables to whatever was in their respective text boxes
    title = request.POST.title.strip()
    desc = request.POST.description.strip()
    due = request.POST.due.strip()

    # Check if title is empty
    if not title:
        return '<script>window.alert("Title cannot be empty!")</script>' + template('templates/new')

    # Check if due date is empty
    if not due:
        return '<script>window.alert("Due date cannot be empty!")</script>' + template('templates/new')

    # Inserts new task into database
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    currTime = datetime.datetime.now()
    c.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES (?,?,?,?,?,?)", (
        title,
        desc, 
        currTime.strftime("%Y-%m-%d"),
        currTime.strftime("%Y-%m-%d"),
        due,
        0))
    new_id = c.lastrowid
    conn.commit()
    c.close()
    redirect("/list")

@route('/edit/<id>', method='GET')
@route('/edit/<id>', method='POST')
def edit(id):
    # Edit button pressed from list, get task with corresponding id
    if not request.POST.save:
        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("SELECT title, description, posted, updated, due, status FROM todo WHERE id LIKE ?", id)
        cur_data = c.fetchone()

        # Task exists
        if cur_data:
            return template(
                'templates/edit_task',
                id=id, old_title=cur_data[0],
                old_desc=cur_data[1],
                posted=cur_data[2],
                updated=cur_data[3],
                old_due=cur_data[4],
                old_status=cur_data[5])
        else:
            return '<script>alert("Task does not exist!")</script>'

    # Saves values after user has edited them
    new_title = request.POST.title.strip()
    new_desc = request.POST.desc.strip()
    new_due = request.POST.due.strip()
    new_status = request.POST.status.strip()

    # Check if date is empty
    if not new_due:
        message = '<script>window.alert("Due date cannot be empty!")</script>'
        return message + template(
            'templates/edit_task',
            id=id,
            old_title=new_title,
            old_desc=new_desc,
            old_due="",
            old_status=new_status)

    # Check if title is empty
    if not new_title:
        message = '<script>window.alert("Title cannot be empty!")</script>'
        return message + template('templates/edit_task',
            id=id,
            old_title=new_title,
            old_desc=new_desc,
            old_due=new_due,
            old_status=new_status)

    new_status = (1 if new_status == 'closed' else 0)

    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    currTime = datetime.datetime.now()
    c.execute("UPDATE todo SET title = ?, description = ?, updated = ?, due = ?, status = ? WHERE id LIKE ?", (new_title, new_desc, currTime.strftime("%Y-%m-%d"), new_due, new_status, id))
    conn.commit()
    c.close
    redirect("/list")

@route('/delete/<id>', method='GET')
@route('/delete/<id>', method='POST')
def delete(id):
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("DELETE FROM todo WHERE id LIKE ?", (id))
    conn.commit()
    redirect("/list")

# run(debug=True, reloader=True)
run()
