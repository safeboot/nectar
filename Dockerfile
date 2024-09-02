FROM node:18-alpine3.18
WORKDIR /app
COPY package.json .
RUN apk add python3
RUN apk --no-cache add build-base
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--port", "5173"]