# 指定我们的基础镜像是node，版本是v8.0.0
# FROM node:8.0.0
FROM jsenht/nginx:1.0.0
# 指定制作我们的镜像的联系人信息（镜像创建者）
MAINTAINER Jsen
ENV TZ "Asia/Shanghai"

COPY ./dist /usr/share/nginx/html/
