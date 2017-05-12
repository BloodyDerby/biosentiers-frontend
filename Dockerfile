FROM node:6.10.3-alpine

LABEL maintainer "mei@heig-vd.ch"

COPY package.json /tmp/app/
WORKDIR /tmp/app

# Docker bug: node-sass required because of https://github.com/sass/node-sass/issues/983
RUN npm install node-sass \
    && npm install \
    && npm cache clean

COPY . /tmp/app/
RUN npm run build \
    && mkdir -p /var/www/app \
    && cp -R /tmp/app/dist/* /var/www/app \
    && rm -fr /tmp/*

WORKDIR /var/www/app

COPY docker/entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
