FROM node:10.13-alpine

RUN mkdir /home/client
WORKDIR /home/client

CMD yarn start