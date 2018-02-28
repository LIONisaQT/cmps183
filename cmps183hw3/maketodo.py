import sqlite3
print("Creating database")
conn = sqlite3.connect('todo.db') # Warning: This file is created in the current directory
conn.execute("CREATE TABLE todo (id INTEGER PRIMARY KEY, title TEXT, description TEXT, posted TEXT, updated TEXT, due TEXT, status bool NOT NULL)")
conn.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES ('Cry', 'In bed', '20XX-04-20', '20XX-04-20', '20XX-69-69',0)")
conn.commit()
print("Database created")
