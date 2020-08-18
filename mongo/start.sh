#!/bin/bash

docker stop brewtool_mongo
docker rm brewtool_mongo
docker pull mongo
docker run -d --network $DOCKER_NETWORK -v /opt/brewtool/mongo:/data/db --name brewtool_mongo -p 27017:27017 mongo
 
