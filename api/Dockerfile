FROM python:2.7-alpine

RUN pip install Flask flask_cors requests mysql-connector-python pymongo
COPY app /app
WORKDIR /app
EXPOSE 5000
CMD python srvr.py
