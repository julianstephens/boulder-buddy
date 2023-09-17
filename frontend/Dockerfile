FROM node:alpine as base

ARG APP_HOME
RUN npm i -g pnpm

FROM base as installer

WORKDIR $APP_HOME

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

FROM installer as development

WORKDIR $APP_HOME

COPY . .

COPY --from=installer $APP_HOME/node_modules ./

CMD ["pnpm", "dev", "--host"]

FROM installer as builder

ARG APP_HOME
WORKDIR $APP_HOME

COPY . .
COPY --from=installer node_modules ./

RUN pnpm build

CMD ["pnpm", "preview"]
