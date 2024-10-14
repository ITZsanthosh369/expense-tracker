
FROM node:18
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .  # This copies all the files in your project, including app.js
EXPOSE 5000
CMD ["npm", "start"]
