#!/bin/bash

docker stop brewtool_mysql
docker rm brewtool_mysql
#echo "Enter MYSQL Root Password"
#read MYSQL_ROOT_PASSWORD
#docker run --name mysql_container --network brewtool -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" -p 3306:3306 -d mysql:latest

#docker exec -i brewdb sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /home/brc/brewtool/sql/brewtool-database.sql

docker run --hostname="brewtool_mysql" --network brewtool --name brewtool_mysql -v /opt/brewtool/sql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD="@WSXcde3@WSXcde3" -d -p 3306:3306 mysql:latest
#docker exec brewdb sh -c 'exec mysqldump --databases brewtool -u"root@brewtool_mysql" -p"$MYSQL_ROOT_PASSWORD"' > /home/brc/brewtool/sql/brewtool-database.sql
