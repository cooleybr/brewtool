import mysql.connector

def getCon():
  mydb = mysql.connector.connect(
      host="mysql",
      user="root",
      password="@WSXcde3@WSXcde3",
      database="brewtool"
  )
  return mydb

def getAll():
  data = {"grains":[],"hops":[],"yeasts":[]}
  mydb = getCon()
  cursor = mydb.cursor()
  sql = "SELECT * FROM grains;"
  cursor.execute(sql)
  result = cursor.fetchall()
  for x in result:
    data['grains'].append(x)
  sql = "SELECT * from yeasts;"
  cursor.execute(sql)
  result = cursor.fetchall()
  for x in result:
    data['yeasts'].append(x)
  sql = "SELECT * from hops;"
  cursor.execute(sql)
  result = cursor.fetchall()
  for x in result:
    data['hops'].append(x)
  return data

def getRecipes():
  mydb = mysql.connector.connect(
                                  host="localhost",
                                  user="root",
                                  password="@WSXcde3@WSXcde3",
                                  database="brewtool"
                                 )
  sql = "SELECT * from recipes;"
  cursor = mydb.cursor()
  cursor.execute(sql)
  result = cursor.fetchall()
  return result

def getBatches():
  mydb = getCon()
  sql = "SELECT * from batches;"
  cursor = mydb.cursor()
  cursor.execute(sql)
  result = cursor.fetchall()
  return result

def addRecipe(recipe):
  mydb = mysql.connector.connect(
                                  host="localhost",
                                  user="root",
                                  password="@WSXcde3@WSXcde3",
                                  database="brewtool"
                                 )
  sql = "INSERT INTO recipes (recipe) VALUES ("+ recipe +")"
  cursor = mydb.cursor()
  cursor.execute(sql)
  mydb.commit()
  return(str(cursor.rowcount) + 'records inserted')

def addBatch(batch):
  mydb = getCon()
  sql = "INSERT into batches (batch) values ("+ batch +");"
  cursor = mydb.cursor()
  cursor.execute(sql,batch)
  mydb.commit()
  return(str(cursor.rowcount) + 'records inserted')

def deleteRecipe(id):
  mydb = getCon()
  sql = "DELETE from batches where id=" + id + ";"
  cursor = mydb.cursor()
  cursor.execute(sql,batch)
  mydb.commit()
  return(str(cursor.rowcount) + 'records deleted')

def deleteBatch(id):
  mydb = getCon()
  sql = "DELETE from batches where id=" + id + ";"
  cursor = mydb.cursor()
  cursor.execute(sql,batch)
  mydb.commit()
  return(str(cursor.rowcount) + 'records deleted')

