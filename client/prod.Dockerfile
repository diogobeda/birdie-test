FROM node:10-alpine as build

RUN apk add yarn

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY ./client /var/app
WORKDIR /var/app
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:1.15-alpine

COPY --from=build /var/app/build /usr/share/nginx/html/
COPY ./client/_infra/nginx.conf /etc/nginx/nginx.conf