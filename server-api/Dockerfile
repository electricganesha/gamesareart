FROM node:latest
RUN mkdir -p /gamesareart-api
WORKDIR /gamesareart-api
COPY package.json /gamesareart-api
RUN npm install -g nodemon
RUN npm install
COPY . /gamesareart-api
EXPOSE 3001
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait 
CMD chmod +x /wait && /wait && nodemon
