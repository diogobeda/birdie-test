FROM node:10-alpine

RUN apk add yarn

COPY ./server /var/app

WORKDIR /var/app
RUN yarn install --frozen-lockfile
RUN yarn build

CMD yarn serve