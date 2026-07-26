FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src

ARG DATABASE_URL="postgresql://eventuser:eventpassword@postgres:5432/eventdb?schema=public"
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]