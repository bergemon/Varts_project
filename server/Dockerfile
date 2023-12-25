FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# RUN npm run migrate:build -y

# RUN npm run migrate:push -y

# RUN npm run seed

RUN npm run build

CMD ["npm", "run", "start"]