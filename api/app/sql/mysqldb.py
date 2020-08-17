import mysql.connector


def getAll():
  data = {"grains":[],"hops":[],"yeasts":[]}
  try:
    mydb = mysql.connector.connect(
      host="mysql_container",
      user="root",
      password="@WSXcde3@WSXcde3",
      database="brewtool"
    )
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
  except:
    print("not connected")
  return data

