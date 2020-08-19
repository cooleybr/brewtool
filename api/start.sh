#!/bin/bash

docker stop brewtool_api
docker rm brewtool_api
docker build -t brewtool_api /home/brc/brewtool/api/
docker run -d --name brewtool_api --network $DOCKER_NETWORK -p 5000:5000 brewtool_api

