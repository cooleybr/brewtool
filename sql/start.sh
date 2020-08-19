#!/bin/bash

docker stop brewtool_mysql
docker rm brewtool_mysql
echo "Enter MYSQL Root Password"
read MYSQL_ROOT_PASSWORD
#docker run --name mysql_container --network brewtool -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" -p 3306:3306 -d mysql:latest

#docker exec -i brewdb sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /home/brc/brewtool/sql/brewtool-database.sql

docker run --name brewtool_mysql --hostname "brewtool_mysql" --network $DOCKER_NETWORK -v /opt/brewtool/sql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" -d -p 3306:3306 mysql:latest
#docker exec brewdb sh -c 'exec mysqldump --databases brewtool -u"root@brewtool_mysql" -p"$MYSQL_ROOT_PASSWORD"' > /home/brc/brewtool/sql/brewtool-database.sql
