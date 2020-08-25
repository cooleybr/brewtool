#!/bin/bash

docker stop brewtool_mongo
docker rm brewtool_mongo
docker pull mongo
docker run -d -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
           -e MONGO_INITDB_ROOT_PASSWORD=@WSXcde3@WSXcde3 \
           -v /opt/brewtool/mongo:/data/db --name brewtool_mongo -p 27017:27017 mongo
 
