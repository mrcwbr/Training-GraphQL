# AdventureWorks Docker Container

## 1. Build Docker Image

```shell
docker build -t graphql-workshop/adventureworks .
```

## 3. Run Image

```shell
docker run -p 1633:1433 --name graphql-workshop-dbs -h GraphQLWorkshopDatabase -d graphql-workshop/adventureworks
```

## 4. Connect

- Server: localhost; 1633
- User: sa
- Password: GraphQL!Workshop