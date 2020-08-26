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

flasky = Flask(__name__)
CORS(flasky)

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

@flasky.route("/", methods=['GET'])
def home():
  if request.method == 'GET':
    return(jsonify({'Status':'Working'}))

@flasky.route("/getIngredients", methods=['GET'])
def getIngredients():
  if request.method == 'GET':
    data = mysqldb.getAll()
    return(dumps(data))

@flasky.route("/getRecipes")
def getRecipes():
  db = getCon()
  try:
    #data = mysqldb.getRecipes()
    data = db.recipes.find()
    #data = postgres.getRecipes()
  except:
    print('failed to get recipes')
  return(dumps(data))

@flasky.route("/getBatches")
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

@flasky.route('/addRecipe', methods=['POST'])
def addRecipe():
  data = request.data
  db = getCon()
  try:
    #id = mysqldb.addRecipe(dumps(data))
    post_id = db.recipes.insert_one(json.loads(data)).inserted_id
    #postgres.insertRecipe(str(data))
    return(jsonify({'Status':'Posted ' + str(post_id)}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@flasky.route('/updateRecipe', methods=['POST'])
def updateRecipe():
  data = request.data
  id = request.args.get('id')
  finder = {'_id': ObjectId(id) }
  recipe = json.loads(data)
  newvalues = { "$set": recipe}
  db = getCon()
  try:
    db.recipes.update_one(finder, newvalues)
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@flasky.route('/addBatch', methods=['POST'])
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

@flasky.route('/updateBatch', methods=['POST'])
def updateBatch():
  data = request.data
  id = request.args.get('id')
  finder = {'_id': ObjectId(id) }
  batch = json.loads(data)
  newvalues = { "$set": batch}
  db = getCon()
  try:
    db.batches.update_one(finder, newvalues)
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@flasky.route('/deleteRecipe', methods=['GET'])
def deleteRecipe():
    db = getCon()
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      #mysqldb.deleteRecipe(id)
      db.recipes.delete_one(payload)
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

@flasky.route('/deleteBatch', methods=['GET'])
def deleteBatches():
    db = getCon()
    id = request.args.get('id')
    payload = {'_id': ObjectId(id) }
    try:
      #mysqldb.deleteBatch(id)
      db.batches.delete_one(payload)
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

@flasky.route('/putMetrics', methods=['POST'])
def putMetrics():
  db = getCon()
  data = request.data
  try:
    post_id = db.metrics.insert_one(json.loads(data)).inserted_id
    return(jsonify({'Status':'success'}))
  except:
    print('failed to post')
    return(jsonify({'Status':'failed'}))

@flasky.route('/getMetrics', methods=['GET'])
def getMetrics():
  db = getCon()
  try:
    data = db.metrics.find()
  except:
    print('failed to get recipes')
  return (dumps(data))

@flasky.route('/deleteMetrics', methods=['GET'])
def deleteMetrics():
    db = getCon()
    try:
      metrics.delete_many({})
      result = {'status':'success'}
    except:
      result = {'status':'failure'}
    return(jsonify(result))

#if __name__=='__main__':
#  app.run(host='0.0.0.0')
