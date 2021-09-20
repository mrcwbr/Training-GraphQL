# Challenge #2: Datenquellen & erweitertes Laden

## Ziel

In dieser Übung wollen die statischen Daten gegen reale Daten aus verschiedenen Quellen ersetzen. Zum einem werden wir Daten direkt aus einer SQL Datenbank gelesen, aber auch aus einer bestehenden REST API geladen. Diese findet ihr unter http://localhost:5000/swagger

### Erstellen der SQL Datenquelle

Legt zuersten einen Folder `data` im `src` an.

Um die Daten aus einer Datenbank zu nutzen wir die [SQLDataSource](https://github.com/cvburgess/SQLDataSource) für Apollo. Diese basiert auf knex.

Bitte installiert folgende Packages:

- knex
- datasource-sql
- mssql

Wir wollen die Sprecher aus der SQL Datasource laden und erzeugen daher ein `speakerData.ts` im `data` Folder.

Implementiert hier bitte eine neuen SQL Datasource:

```typescript
export interface ISpeakerApi {
  getSpeakers(): Promise<ISpeakerDataModel[]>;
  getSpeaker(speakerId: number): Promise<ISpeakerDataModel | undefined>;
  getSpeakerSessions(speakerId: number): Promise<ISessionDataModel[]>;
}

class SpeakerData extends SQLDataSource implements ISpeakerApi {
  //TODO: Implement ISpeakerAPI
}
```

> In der `solution.md` findet ihr die Lösungen. Alternative könnt ihr euch Hilfe auf der Seite der [SQLDataSource](https://github.com/cvburgess/SQLDataSource) holen oder aus der [knex Documentation](https://knexjs.org/).

## Erstellen der REST Datenquellen

REST API: http://localhost:5000/swagger

Ihr benötigt als erstes das Package `apollo-datasource-rest`.

Aus der REST API wollen wir zwei Datesources erstellen:

- SessionDataSource in `data/sessionData.ts`
- AttendeeDataSource in `data/attendeeData.ts`

Als Vorgabe gibt es je ein Interface:

```typescript
export interface ISessionApi {
  allSessions(): Promise<ISession[]>;
  sessionById(sessionId: number): Promise<ISession>;
}

export interface IAttendeeApi {
  allAttendees(): Promise<IAttendee[]>;
  attendeeById(sessionId: number): Promise<IAttendee>;
}
```

Die Grundlegende implementierung ist ähnlich der SQL Datenquelle.

> In der `solution.md` findet ihr die Lösungen. Alternative könnt ihr euch Hilfe aus der [Apollo Documentation](https://www.apollographql.com/docs/apollo-server/data/data-sources/#restdatasource-reference) holen.

## Einbinden der Datenquellen in den Apollo Server

Nun müsst ihr noch die Datenquellen in den Apollo Server einbinden.

Für die SQL Datenquelle benötigt ihr noch eine Konfiguration. Erstellt euch dafür ein `dbConfig.ts` im `src` Folder mit folgenden Inhalt:

```typescript
export default {
  client: 'mssql',
  connection: {
    host: '127.0.0.1',
    port: 1633,
    user: 'sa',
    password: 'GraphQL!Workshop',
    database: 'conferences',
    options: {
      trustServerCertificate: true,
    },
  },
};
```

In der `server.ts` müsst ihr jetzt noch die Datenquellen registriert werden.

```typescript
const server = new ApolloServer({
  // ...
  dataSources: () => {
    return {
      speakerDb: new SpeakerData(dbConfig),
      sessionApi: new SessionData(),
      attendeeApi: new AttendeeData(),
    };
  },
});
```

Jetzt könnt ihr die Datenquellen über den [Playground](http://localhost:3000/graphql) testen.

## Erweitern der Queries und Resolver (ResolverChain)

Wir wollen nun auch die Sessions von einem Sprecher laden können. Dazu erweitern wir den Speaker Type im GraphQL Schema um `sessions: [Session]`

Die `speakerResolver.ts` muss nun entsprechend erweitert werden:

```typescript
export default {
  Query: {
    speakers: async (parent, args, context, info): Promise<ISpeaker[]> => {
      // Already implemented
    },
    speaker: async (parent, args, context, info): Promise<ISpeaker> => {
      // Already implemented
    },
  },
  Speaker: {
    sessions: async (parent, args, context, info): Promise<ISession[]> => {
      // TODO: Implement here te logic to load the Speaker sessions
    },
  },
};
```

> In der `solution.md` findet ihr die Lösungen. Alternative könnt ihr euch Hilfe aus der [Apollo Documentation - Resolver Chain](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains) holen.

## Ressourcen

- [GraphQL - Resolver Chains](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains)
- [Datenquellen](https://www.apollographql.com/docs/apollo-server/data/data-sources/)