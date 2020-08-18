#!/bin/bash

docker stop brewtool_client
docker rm brewtool_client
docker build -t brewtool_client ./client/
docker run -d --name brewtool_client --network $DOCKER_NETWORK -p 4200:4200 brewtool_client

