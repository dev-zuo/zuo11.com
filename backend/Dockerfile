FROM keymetrics/pm2:latest-alpine
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm config set registry https://registry.npm.taobao.org/ && \
npm i
EXPOSE 8700
CMD ["pm2-runtime", "start", "process.yml"]

# FROM node:10-alpine
# ADD . /app/
# WORKDIR /app
# RUN npm install
# EXPOSE 8700
# CMD ["node", "index.js"]