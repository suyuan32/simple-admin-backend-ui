FROM nginx:1.25.2-alpine

COPY dist/ /usr/share/nginx/html/
COPY deploy/default.conf /etc/nginx/conf.d/

LABEL MAINTAINER="yuansu.china.work@gmail.com"

EXPOSE 80
