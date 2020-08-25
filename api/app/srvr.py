from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from sql import mysqldb
#from pg import postgres
from pymongo import MongoClient
import datetime
import pprint
from bson.json_util import dumps
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

#client = MongoClient('localhost',27017)
def getCon():
  client = MongoClient('mongo',
                     username='mongoadmin',
                     password='@WSXcde3@WSXcde3',
                     authSource='brewtool',
                     authMechanism='SCRAM-SHA-256')
  #client = MongoClient('localhost',27017)
  #db = MongoClient("mongodb://mongoadmin:@WSXcde3@WSXcde3@mongo:27017/brewtool")
  db = client.brewtool
  return db
#recipes = db.recipes
#batches = db.batches
#grains = db.grains
#hops = db.hops
#yeast = db.yeast
#metrics = db.metrics

@app.route("/", methods=['GET'])
def home():
  if request.method == 'GET':
    return(jsonify({'Status':'Working'}))

@app.route("/getIngredients", methods=['GET'])
def getIngredients():
  if request.method == 'GET':
    data = mysqldb.getAll()
    return(dumps(data))

@app.route("/getRecipes")
def getRecipes():
  db = getCon()
  print('getting recipes')
  try:
    #data = mysqldb.getRecipes()
    data = db.recipes.find()
    #data = postgres.getRecipes()
  except:
    print('failed to get recipes')
  return(dumps(data))

@app.route("/getBatches")
def getBatches():
  db = getCon()
  try:
    #data = mysqldb.getBatches()
    data = db.batches.find()
    #data = postgres.getBatches()
  except:
    print('failed to get batches')
    data = {}
  return(dumps(data))

@app.route('/addRecipe', methods=['POST'])
def addRecipe():
  data = request.data
  db = getCon()
  try:
    #id = mysqldb.addRecipe(dumps(data))
    post_id = db.recipes.insert_one(json.loads(data)).inserted_id
    #postgres.insertRecipe(str(data))
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@app.route('/addBatch', methods=['POST'])
def addBatch():
  db = getCon()
  data = request.data
  try:
    #id = mysqldb.addBatch(dumps(data))
    post_id = db.batches.insert_one(json.loads(data)).inserted_id
    #postgres.insertBatch(str(data))
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@app.route('/deleteRecipe', methods=['GET'])
def deleteRecipe():
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      #mysqldb.deleteRecipe(id)
      recipes.delete_one(payload)
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

@app.route('/deleteBatch', methods=['GET'])
def deleteBatches():
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      #mysqldb.deleteBatch(id)
      batches.delete_one(payload)
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
