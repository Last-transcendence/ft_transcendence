FROM node:16-alpine3.14 AS builder

LABEL	name="nestjs" \
		version="1.0" \
		description="nestjs"

EXPOSE 3000

WORKDIR /app

COPY . .

ENV HOME=/app

RUN yarn install --frozen-lockfile && yarn build

ENTRYPOINT [ "yarn", "run", "start:dev" ]