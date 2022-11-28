FROM node:16

WORKDIR /opt/
COPY ./package.json ./
RUN yarn install

COPY . .

run yarn build

CMD ["yarn", "start"]
