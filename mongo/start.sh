#!/bin/bash

docker stop mongo_container
docker rm mongo_container
docker run -d --network brewtool --name mongo_container -p 27017:27017 mongo
 
