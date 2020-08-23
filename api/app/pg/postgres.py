import psycopg2

def test():
  connection = psycopg2.connect(user = "brewtool",
                                  password = "@WSXcde3@WSXcde3",
                                  host = "brewtool_postgres",
                                  port = "5432",
                                  database = "brewtool")
  cursor = connection.cursor()
  cursor.execute("SELECT version();")
  print("execute")
  record = cursor.fetchone()
  print(record)
  print("Not connected")
  return(str(record))
