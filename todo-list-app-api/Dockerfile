FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#Nodemon install hot reload
RUN npm install -g nodemon

EXPOSE 5010

#Nodemon hot reload app.js
CMD ["nodemon", "app.js"]

#Not hot reload
#CMD ["node", "app.js"]