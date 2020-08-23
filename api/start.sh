#!/bin/bash

docker stop brewtool_api
docker rm brewtool_api
docker build -t brewtool_api /home/brc/brewtool/api/
docker run --network brewtool -d --name brewtool_api -p 5000:5000 brewtool_api

