# Conference API & Database Docker Containers

## 1. Build the Docker Images with docker-compose

```shell
docker-compose build
```

## 3. Create Containers with docker-compose

```shell
docker-compose up
```

## 4. Try to connect

### Database

You can open a SQL Client (like Azure Data Studio) and connect to:

- Server: localhost; 1633
- User: sa
- Password: GraphQL!Workshop

### Conference API

Open a browser and enter `http://localhost:5000/swagger`

## 5. Remove and delete docker-compose containers

```shell
docker-compose rm
```