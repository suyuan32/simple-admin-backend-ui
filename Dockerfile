From nginx:1.23.1-alpine

COPY dist/ /usr/share/nginx/html/
COPY deploy/default.conf /etc/nginx/conf.d/

LABEL MAINTAINER="RyanSU@yuansu.china.work@gmail.com"

EXPOSE 80
