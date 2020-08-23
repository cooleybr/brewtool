#!/bin/bash

docker stop brewtool_postgres
docker rm brewtool_postgres
docker run -d \
    --name brewtool_postgres \
    -p 5432:5432 \
    --hostname brewtool_postgres \
    --network brewtool \
    -e POSTGRES_USER=brewtool \
    -e POSTGRES_PASSWORD=@WSXcde3@WSXcde3 \
    -e POSTGRES_DB=brewtool \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v /opt/brewtool/sql:/var/lib/postgresql/data \
    postgres
