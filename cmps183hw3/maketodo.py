import sqlite3
print("Creating database")
conn = sqlite3.connect('todo.db') # Warning: This file is created in the current directory
conn.execute("CREATE TABLE todo (id INTEGER PRIMARY KEY, title TEXT, description TEXT, posted DATE, updated DATE, due DATE, status bool NOT NULL)")
conn.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES ('Cry', 'In bed', '2018-04-20', '2018-04-20', '2018-04-20', 0)")
conn.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES ('Finish homework 3', 'Too hard :C', '2018-02-27', '2018-02-28', '2018-02-28', 0)")
conn.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES ('Appease Prof. Jullig for better grades', 'Wait when is class again?', '2018-02-28', '2018-02-28', '2018-02-28', 0)")
conn.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES ('Procrastinate', 'Play Overwatch ggez', '2018-02-28', '2018-02-28', '2018-04-20', 1)")
conn.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES ('Put more stuff into this list', 'Will anyone read this?', '2018-04-20', '2018-04-20', '2018-04-20', 1)")
conn.execute("INSERT INTO todo (title,description,posted,updated,due,status) VALUES ('Please grade easily', 'I just want to pass :C', '2018-04-20', '2018-04-20', '2018-04-20', 0)")
conn.commit()
print("Database created")
