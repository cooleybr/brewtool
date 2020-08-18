#!/bin/bash

echo "Name Docker Network:"
read DOCKER_NETWORK
echo "Executing start scripts"
client/start.sh
echo "client Docker Building"
mongo/start.sh
echo "Mongo Container Building"
sql/start.sh
echo "MySQL Container Building"
api/start.sh
echo "API Service Building"
echo "If this is the first time loading the application, populate the sql database with the following db dump"
echo "docker exec -i brewdb sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /home/brc/brewtool/sql/brewtool-database.sql"
