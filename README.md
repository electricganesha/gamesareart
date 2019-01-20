# Games Are Art

Games Are Art is a project directed at creating a platform to showcase and share artistic video-games. It is currently a WIP.

## Installing
Clone or download the code from this repo. Install [Docker](https://www.docker.com/) on your machine. Read the [Docker Documentation](https://docs.docker.com/get-started/) and run the command `docker-compose build` inside the root project folder to build the docker containers.

## Running
From the root project folder, run the command `docker-compose up` to start all the projects simultaneously. You can then navigate to [http://localhost:4201](http://localhost:4201) to access the back-office and [http://localhost:3001](http://localhost:3001) to access the API. 

## Structure
- gamesareart (root folder)
    - server-api (api folder) - a node.js application using mongodb
    - back-office - an ember.js application

### Support or Contact
Contact [electricganesha](https://github.com/electricganesha) if you have any doubts.
