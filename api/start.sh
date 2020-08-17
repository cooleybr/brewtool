#!/bin/bash

docker stop api_container
docker rm api_container
docker build -t api-server .
docker run -d --name api_container --network brewtool -p 5000:5000 api-server:latest

