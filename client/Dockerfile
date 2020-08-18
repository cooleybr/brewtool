FROM node:12.2.0

WORKDIR /app
COPY . /app
RUN npm i
RUN npm install -g @angular/cli
CMD ng serve --host 0.0.0.0
