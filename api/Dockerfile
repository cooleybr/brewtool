FROM alpine:latest
RUN apk add --update --no-cache py-pip
RUN pip install Flask flask_cors requests mysql-connector-python pymongo
COPY app /app
WORKDIR /app
EXPOSE 5000
CMD python3 srvr.py
