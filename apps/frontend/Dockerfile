FROM node:20 AS builder

WORKDIR /app

COPY ../../package.json ../../package-lock.json ./

RUN npm install

COPY ../../apps/frontend ./apps/frontend

RUN npm run frontend:build 

FROM node:20 AS runner

WORKDIR /app

COPY --from=builder /app/apps/frontend/dist ./

EXPOSE 3000

CMD ["node", "server/server.bundle.js"]
