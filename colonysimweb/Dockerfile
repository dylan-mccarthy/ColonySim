FROM node:12.22.10-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000:80

CMD ["npm", "start"]