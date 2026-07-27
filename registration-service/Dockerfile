FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY .env.example ./.env

RUN npx prisma generate

COPY src ./src

EXPOSE 3003

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]