# Redis Session Management

This repository contains a JWT token-based authentication server written in TypeScript using Node.js, Express, MongoDB, Redis, and containerized with Docker.


## Tech

- [NodeJS](https://nodejs.org/en/) - JavaScript runtime environment.
- [Express](https://expressjs.com/) - Web framework for NodeJS.
- [Typescript](https://www.typescriptlang.org/) - Strongly typed programming language.
- [MongoDB](https://www.mongodb.com/) - Document-oriented database.
- [Redis](https://redis.io/) - In-memory data structure store.
- [Docker](https://www.docker.com/) - Open source containerization platform.
- [Yup](https://github.com/jquense/yup) - Schema validation.
- [Winston](https://github.com/winstonjs/winston) - Logger.

## Prerequisites

Before running the server, you need to set some environment variables in the `.env` file at the root of the cloned repository.

- PORT - Port to run server.
- DATABASE_URL_DEV - MongoDB Database Connection string.
- REDIS_URL - Redis Connection string
- DATABASE - Name of the database.
- JWT_SECRET_KEY - Jwt secret key.

## Installation

1. Clone the repository.
```sh
https://github.com/rfist/redis-session-express
```
2. Navigate to the cloned repository.
```shell
cd redis-session-express
```
3. Build the Docker image.
```sh
docker compose build
```
4. Run the Docker container.
```sh
docker compose up
```

The server should now be running on the specified port. (Default 4000)

# Usage

This server provides the following endpoints:

* `POST /api/auth/signup`: Registers a new user.
* `POST /api/auth/signin`: Logs in an existing user.
* `GET /api`: A test endpoint for checking authorization.

To use the server, you can send HTTP requests to these endpoints. The repository includes an IntelliJ IDEA [REST configuration file](rest.http) with sample requests that you can use as a reference.

The `GET /api` endpoint requires authentication, which means you must include the JWT token in the `Authorization` header of your request. 

# License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).