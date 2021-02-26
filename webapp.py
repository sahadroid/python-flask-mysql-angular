import json 
from datetime import datetime 
from flask import Flask,request, send_from_directory
import model
import random

app = Flask(__name__, static_url_path='')


def AsDict(incident):
  return {
      'id': incident.id, 'severity': incident.severity, 'category': incident.category,'device': incident.device,'name': incident.name, 'status': incident.status, 'starttime': incident.starttime}


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
    incidents = model.AllIncidents()
    r = [AsDict(incident) for incident in incidents ]
    return json.dumps(r)


@app.route('/rest/update', methods=['POST'])
def update():
    r = json.loads(request.get_data())
    incident = model.UpdateIncident(r['id'], r['severity'], r['category'], r['device'], r['name'], r['status'])
    r = AsDict(incident)
    return json.dumps(r)


@app.route('/rest/insert', methods=['POST'])
def insert():
    r = json.loads(request.get_data())
    rand = random.randint(10000, 9999999) 
    starttime = str(datetime.now()) 
    ds = starttime.split(".") 
    dsx = ds[0]
    incident = model.InsertIncident(rand, r['severity'], r['category'], r['device'], r['name'], r['status'], dsx)
    r = AsDict(incident)
    return json.dumps(r)


@app.route('/rest/delete', methods=['POST'])
def delete():
    r = json.loads(request.get_data())
    incident = model.DeleteIncident(r['id'])
    return json.dumps(AsDict(incident))


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
