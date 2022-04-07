FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . ./
EXPOSE 3000
CMD ["./node_modules/.bin/keystone-next", "start"]