FROM node:9.5.0-alpine

MAINTAINER devicehive

LABEL org.label-schema.url="https://devicehive.com" \
      org.label-schema.vendor="DeviceHive" \
      org.label-schema.vcs-url="https://github.com/devicehive/devicehive-backend-node" \
      org.label-schema.name="devicehive-backend-node" \
      org.label-schema.version="development"

ENV WORK_DIR=/usr/src/app/
ENV CONF_DIR=/usr/src/app/conf
RUN mkdir -p ${WORK_DIR} \
    && mkdir -p ${CONF_DIR} \
    && cd ${WORK_DIR}

WORKDIR ${WORK_DIR}

COPY . ${WORK_DIR}

RUN apk update \
    && apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && npm cache clean --force \
    && apk del .gyp

RUN npm install pm2 -g

VOLUME ["/usr/src/app/conf"]
CMD ["pm2-docker", "application/DeviceHiveBackendApplication-cluster.js"]
