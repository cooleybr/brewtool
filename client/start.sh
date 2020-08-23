#!/bin/bash

docker stop brewtool_client
docker rm brewtool_client
docker build -t brewtool_client /home/brc/brewtool/client/
docker run -d --name brewtool_client --network brewtool -p 4200:4200 brewtool_client

