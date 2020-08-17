#!/bin/bash

docker stop brewdb
docker rm brewdb
echo "Enter MYSQL Root Password"
read MYSQL_ROOT_PASSWORD
docker run --name brewdb -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" -p 3306:3306 -d mysql:latest

#docker exec -i brewdb sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /home/brc/brewtool/sql/brewtool-database.sql

#docker run --name brewdb -v /opt/brewtool/sql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" -d mysql:tag
#docker exec brewdb sh -c 'exec mysqldump --databases brewtool -uroot -p"$MYSQL_ROOT_PASSWORD"' > /home/brc/brewtool/sql/brewtool-database.sql
