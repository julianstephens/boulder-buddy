FROM node:alpine as build

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install

COPY . /app/

# RUN CI=1 pnpm test

RUN pnpm build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
