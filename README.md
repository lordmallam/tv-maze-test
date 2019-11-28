# TV MAZE Test App
A three (3) tier Dockerized application to demonstrate React and Python Dev skills.

It consists of the following running within docker containers:

- A postgres database instance (Storing Application data)
- A Django RestFul Framework API (API logic and TV Maze proxy)
- A React frontend (UI, Search, Watchlist management)

## Install

- Clone repo `git clone https://github.com/lordmallam/tv-maze-test.git`

## Running

1. `./scripts/docker_start.sh --build`

2. There should now be three servers running:
  - [http://localhost:8000/api/](http://localhost:8000/api/) is the Django (API) app
  - [http://localhost:3000](http://localhost:3000) is the React (UI) app
  - Postgres Database (Accessible internally only)

### Startup individual components

1. API
    -  `./scripts/docker_start.sh api`
2. UI
    -  `./scripts/docker_start.sh ui`
3. DB
    -  `./scripts/docker_start.sh db`
