from datetime import time
from flask import Flask, json, redirect, render_template, make_response, Response, request, jsonify
from flask_cors import CORS
import sqlite3

class Task:
    def __init__(self, id, title, description, checked) -> None:
        self.id = id
        self.title = title
        self.description = description
        self.checked = checked

app = Flask(__name__)
CORS(app)
app.secret_key = 'fdfsdfgd'

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/api/tasks',methods=["POST"])
def tasks():
    json = request.json
    user_id = json['user_id']

    con = sqlite3.connect('web3.db')
    cur = con.cursor()

    task_list = [dict(id = row[0], title = row[1], description = row[2], checked = row[5]) for row in cur.execute('select * from tasks where user_id = :user_id',dict(user_id = user_id)).fetchall()]

    return jsonify(tasks=task_list), 200

@app.route('/api/check_pass',methods=["POST"])
def check_pass():
    json = request.json
    username = json['username']
    password = json['password']

    con = sqlite3.connect('web3.db')
    cur = con.cursor()

    try:
        user_id, db_pass = cur.execute('select id, password from users where username = :username',dict(username = username)).fetchone()
    except:
        return make_response("", 400)

    if(password == db_pass):
        return jsonify(dict(user_id=user_id)), 200
    else:
        return make_response("", 400)

@app.route('/api/register',methods=["POST"])
def register():
    json = request.json
    username = json['username']
    password = json['password']

    con = sqlite3.connect('web3.db')
    cur = con.cursor()

    try:
        cur.execute('insert into users(username, password) values (:username, :password)',dict(username = username, password = password))
        con.commit()
    except con.IntegrityError:
        return make_response("", 400)

    user_id = cur.lastrowid

    return make_response("", 200)

@app.route('/api/create_task',methods=["POST"])
def create_task():
    json = request.json
    title = json['title']
    description = json['description']
    user_id = json['user_id']
    con = sqlite3.connect('web3.db')
    cur = con.cursor()
    cur.execute('insert into tasks(title, description, user_id) values(:title,:description, :user_id)',dict(title = title,
                                                                                                            description = description,
                                                                                                            user_id = user_id
                                                                                                            ))
    con.commit()
    return make_response("", 200)

@app.route('/api/delete_task',methods=["POST"])
def delete_task():
    json = request.json
    id = json['id']
    con = sqlite3.connect('web3.db')
    cur = con.cursor()
    cur.execute('delete from tasks where id = :id',dict(id = id))
    con.commit()
    return make_response("", 200)

@app.route('/api/task',methods=["POST"])
def task():
    json = request.json
    id_task = json['id']
    current_user = json['current_user']

    con = sqlite3.connect('web3.db')
    cur = con.cursor()

    try:
        title, description, user_id = cur.execute('select title, description, user_id from tasks where id = :id_task',dict(id_task=id_task)).fetchone()
    except:
        return make_response("", 404)

    if(int(current_user) != int(user_id)):
        return make_response("", 403)
    else:
        return jsonify(dict(title=title,description=description)), 200

@app.route('/api/checkbox_changed',methods=["POST"])
def checkbox_changed():
    json = request.json
    id = json['id']
    con = sqlite3.connect('web3.db')
    cur = con.cursor()
    cur.execute('update tasks set checked = (checked + 1) % 2 where id = :id',dict(id = id))
    con.commit()
    return make_response("", 200)

@app.route('/api/save_changes',methods=["POST"])
def save_changes():
    json = request.json
    id = json['id']
    new_title = json['title']
    new_description = json['description']
    con = sqlite3.connect('web3.db')
    cur = con.cursor()
    cur.execute('update tasks set title = :new_title, description = :new_description where id = :id',dict(id = id, new_title=new_title,new_description=new_description))
    con.commit()
    return make_response("", 200)