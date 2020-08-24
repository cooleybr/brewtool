import psycopg2

def getCon():
  connection = psycopg2.connect(user = "brewtool",
                              password = "@WSXcde3@WSXcde3",
                              host = "postgres",
                              port = "5432",
                              database = "brewtool")
  cursor = connection.cursor()
  return cursor

def getRecipes():
  cursor = getCon()
  select_recipes = "select * from recipes"
  print('selecting')
  try:
    cursor.execute(select_recipes)
    return cursor.fechall()
  except:
    print('no worky')
    return([])

def getBatches():
  cursor = getCon()
  select_batches = "select * from batches"
  print('selecting')
  try:
    cursor.execute(select_batches)
    return cursor.fetchall()
  except:
    print('no worky')
    return([])

def insertRecipe(recipe):
  print(recipe)
  cursor = getCon()
  postgres_insert_query = """ INSERT INTO recipes (recipe) VALUES (%s);"""
  record_to_insert = (recipe)
  try:
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()
  except:
    print('no worky')

def insertBatch(batch):
  cursor = getCon()
  postgres_insert_query = """ INSERT INTO batches (batch) VALUES (%s);"""
  record_to_insert = (batch)
  try:
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()
  except:
    print('no worky')
