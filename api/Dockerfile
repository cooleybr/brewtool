FROM python:3.5-alpine

RUN apk update && \
    apk add --no-cache --virtual build-deps gcc python3-dev musl-dev && \
    apk add postgresql-dev
RUN pip install Flask flask_cors requests mysql-connector-python pymongo psycopg2
COPY app /app
WORKDIR /app
EXPOSE 5000
CMD python3 srvr.py
