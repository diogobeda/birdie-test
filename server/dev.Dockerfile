FROM node:10.13-alpine

RUN mkdir /home/server
WORKDIR /home/server

CMD yarn start-dev