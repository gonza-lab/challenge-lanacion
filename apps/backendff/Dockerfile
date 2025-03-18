FROM node:20 AS builder

WORKDIR /app

COPY ../../ ./

RUN npm install

COPY ../../apps/backendff ./apps/backendff

RUN npx nx build backendff

FROM node:20 AS runner

WORKDIR /app

COPY --from=builder /app/apps/backendff/dist ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001

CMD ["node", "main.js"]
