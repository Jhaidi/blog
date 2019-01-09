FROM node:8

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV


RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install pm2 -g
RUN yarn

CMD ["npm", "run", "dev"]