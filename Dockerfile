FROM node:18-alpine AS BASE

WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --no-cache git \
    && yarn install --frozen-lockfile \
    && yarn cache clean

#BUILD
FROM node:18-alpine AS BUILD

WORKDIR /app

COPY --from=BASE /app/node_modules ./node_modules

COPY . .

RUN apk add --no-cache curl \ 
    && curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin \
    && apk del curl \
    && apk add --no-cache git curl \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline \
    && node-prune

#Build production
FROM node:18-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/package.json /app/yarn.lock ./
COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/.next ./.next
COPY --from=BUILD /app/public ./public

EXPOSE 3000

CMD [ "yarn", "start" ]
