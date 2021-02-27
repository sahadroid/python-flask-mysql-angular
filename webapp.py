import json 
from datetime import datetime 
from flask import Flask,request, send_from_directory
import model
import random

app = Flask(__name__, static_url_path='')


def AsDict(user):
  return {
      'id_users': user.id_users, 'fullname': user.fullname, 'phone': user.phone,'email': user.email,'created_date': str(user.created_date), 'status_active': user.status_active, 'periode_weekly': user.periode_weekly, 'periode_monthly': user.periode_monthly}

def AsDictx(subscribe):
  return {
      'id_subscribe': subscribe.id_subscribe, 'created_date': str(subscribe.created_date), 'id_users': subscribe.id_users, 'periode': subscribe.periode}


@app.route('/')
def index():
    return send_from_directory('app', 'index.html')


@app.route('/js/<path:path>')
def send_js(path):
    print (path)
    return send_from_directory('app/js', path)


@app.route('/partials/<path:path>')
def send_partials(path):
    print (path)
    return send_from_directory('app/partials', path)


@app.route('/css/<path:path>')
def send_css(path):
    print (path)
    return send_from_directory('app/css', path)


@app.route('/rest/query')
def get_all():
    users = model.AllUsers()
    r = [AsDict(user) for user in users ]
    return json.dumps(r)


@app.route('/rest/update', methods=['POST'])
def update():
    r = json.loads(request.get_data())
    user = model.UpdateUser(r['id_users'], r['fullname'], r['phone'], r['email'], r['periode_weekly'], r['periode_monthly'])
    r = AsDict(user)
    return json.dumps(r)


@app.route('/rest/insert', methods=['POST'])
def insert():
    r = json.loads(request.get_data())
    rand = random.randint(10000, 9999999) 
    created_date = datetime.now().date()
    status_active = "Y";
    periode_weekly = "N";
    periode_monthly = "N";
    user = model.InsertUser(rand, r['fullname'], r['phone'], r['email'], created_date, status_active, periode_weekly, periode_monthly)
    r = AsDict(user)
    return json.dumps(r)


@app.route('/rest/delete', methods=['POST'])
def delete():
    r = json.loads(request.get_data())
    user = model.DeleteUser(r['id_users'])
    return json.dumps(AsDict(user))

@app.route('/rest/logsubscribe', methods=['POST'])
def logsubscribe():
    r = json.loads(request.get_data())
    rand_ = random.randint(10000, 9999999) 
    created_date = datetime.now().date()
    subscribe = model.UpdateSubscribe(rand_, created_date, r['id_users'], r['periode'])
    return json.dumps(AsDictx(subscribe))

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
