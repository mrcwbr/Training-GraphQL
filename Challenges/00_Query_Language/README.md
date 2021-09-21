# Challenge #0: Query Language GraphQL kennenlernen

## Ziel

Zu Beginn wollen wir uns mit der GraphQL Syntax vertraut machen. 

Hier zu nutzen wir einen öffentlich zugänglichen GraphQL Server der ebenfalls auf Apollo basiert:

**[GraphQL Jobs API](https://api.graphql.jobs/)**

## Abfragen ausführen

Abfragen sind immer nach disem Schema aufgebaut

```
query {
  companies {
    id
    name
    jobs {
      title
    }
  }
}
```

Weitere Informationen wie man Queries schreibt, findest du in der [GraphQL Dokumentation](https://graphql.org/learn/queries/).


## Ressourcen

- [Public GraphQL APIs](https://github.com/APIs-guru/graphql-apis)
- [GraphQL Jobs API Docs](https://graphql.jobs/docs/api/)