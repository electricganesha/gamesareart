FROM node:latest
RUN mkdir -p /gamesareart
WORKDIR /gamesareart
COPY package.json /gamesareart
RUN npm install
COPY . /gamesareart
EXPOSE 3000
CMD ["npm", "start"]