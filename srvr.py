from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import mysqldb
from pymongo import MongoClient
import datetime
import pprint
from bson.json_util import dumps
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient('localhost',27017)
db = client.brew_database
recipes = db.recipes
batches = db.batches
grains = db.grains
hops = db.hops
yeast = db.yeast
metrics = db.metrics

@app.route("/", methods=['GET'])
def home():
  if request.method == 'GET':
    return(jsonify({'Status':'Working'}))

@app.route("/getData", methods=['GET'])
def getData():
  if request.method == 'GET':
    data = mysqldb.getAll()
    return(data)

@app.route("/get_recipes")
def getRecipes():
  try:
    data = recipes.find()
  except:
    print('failed to get recipes')
  return(dumps(data))

@app.route("/get_batches")
def getBatches():
  try:
    data = batches.find()
  except:
    print('failed to get batches')
    data = {}
  return(dumps(data))

@app.route("/get_grains")
def getGrains():
  try:
    data = grains.find()
  except:
    print('failed to get grains')
  return(dumps(data))

@app.route("/get_hops")
def getHops():
  try:
    data = hops.find()
  except:
    print('failed to get hops')
  return(dumps(data))

@app.route("/get_yeast")
def getYeast():
  try:
    data = yeast.find()
  except:
    print('failed to get yeast')
  return(dumps(data))

@app.route('/add_recipe', methods=['POST'])
def addRecipe():
  data = request.data
  try:
    post_id = recipes.insert_one(json.loads(data)).inserted_id
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@app.route('/add_batch', methods=['POST'])
def addBatch():
  data = request.data
  try:
    post_id = batches.insert_one(json.loads(data)).inserted_id
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@app.route('/add_grains', methods=['POST'])
def addGrains():
  data = request.data
  try:
    post_id = grains.insert_one(json.loads(data)).inserted_id
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@app.route('/add_hops', methods=['POST'])
def addHops():
  data = request.data
  try:
    post_id = hops.insert_one(json.loads(data)).inserted_id
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@app.route('/add_yeast', methods=['POST'])
def addYeast():
  data = request.data
  try:
    post_id = yeast.insert_one(json.loads(data)).inserted_id
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@app.route('/delete_recipe', methods=['GET'])
def deleteRecipe():
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      recipes.delete_one(payload)
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

@app.route('/delete_batch', methods=['GET'])
def deleteBatches():
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      batches.delete_one(payload)
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

@app.route('/delete_grains', methods=['GET'])
def deleteGrains():
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      grains.delete_one(payload)
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

@app.route('/delete_hops', methods=['GET'])
def deleteHops():
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      hops.delete_one(payload)
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

@app.route('/delete_yeast', methods=['GET'])
def deleteYeast():
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      yeast.delete_one(payload)
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

@app.route('/putMetrics', methods=['POST'])
def putMetrics():
  data = request.data
  try:
    post_id = metrics.insert_one(json.loads(data)).inserted_id
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@app.route('/getMetrics', methods=['GET'])
def getMetrics():
  try:
    data = metrics.find()
  except:
    print('failed to get recipes')
  return (dumps(data))

@app.route('/deleteMetrics', methods=['GET'])
def deleteMetrics():
    try:
      metrics.delete_many({})
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

if __name__=='__main__':
  app.run(host='0.0.0.0')

