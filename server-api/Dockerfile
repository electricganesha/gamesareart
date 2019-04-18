FROM node:latest
RUN mkdir -p /gamesareart
WORKDIR /gamesareart
COPY package.json /gamesareart
RUN npm install
COPY . /gamesareart
EXPOSE 3001
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait 
CMD chmod +x /wait && /wait && npm start
