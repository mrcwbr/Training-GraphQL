# Challenge #9: Testing & Mocking

## Ziel

In der letzten Übung schauen wir uns an, welche Möglichkeiten der Apollo Server im Context von Tests und Mocks bietet. Das Ziel ist es einen UnitTest mit jest zu schreiben, der das `attendees` Query testet und gut Mocks Daten zurück gibt. Hierfür setzen für Faker.js ein.

## Vorbereitung

Zuerst müssen wir die pubsub Implementierung aus der `server.ts` in ein eigenes File verschieben, damit später beim ausführen der Unit Tests nicht der Server gestartet wird. Grund ist das in den Subscriptions und Mutations auf pubsub referenziert wird und somit auch die `server.ts` geladen wird. Wie wollen jedoch nur unseren "ApolloTestServer" starten.

Legt `./pubSub.ts` an und kopiert folgendes hinein:

```typescript
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
```

Genau das muss jetzt aus der `server.ts` entfernt werden und die Referenzen in `./src/resolvers/attendeeResolvers.ts` und `./src/resolvers/sessionResolvers.ts` aktualisiert werden.

## Mocks im Apollo aktivieren

Wir setzen das `mock` Attribute im ApolloServer in `server.ts` auf `true`. Wenn wir jetzt den Apollo Server starten, bekommen wir keine realen Werte mehr aus unseren Datenquellen, sondern Fake Werte. Diese sind nicht besonders sinnvoll, daher werden wir als nächstes Faker nutzen um realistischere Werte zu erhalten.

## Faker.js hinzufügen & konfigurieren

Zuerst müssen wir Faker installieren

```bash
yarn add faker
yarn add - D @types/faker
```

Danach erstellen wir eine `mock.ts` und konfigurieren für uns Schema die gewünschten Mock Werte.

```typescript
import { MockList } from 'apollo-server-express';
import faker from 'faker/locale/de';

export default {
  Query: () => ({
    attendees: () => new MockList([2, 20]),
  }),
  Attendee: () => ({
    id: () => faker.datatype.number({ min: 0, max: 89 }),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    userName: () => faker.internet.userName(),
    emailAddress: () => faker.internet.email(),
  }),
};
```

Generiert nun nach diesem Beispiel ebenfalls Mocks für Speaker und Sessions.

Wenn ihr das erledigt habt müsst ihr in der `server.ts` im ApolloServer noch anstelle `mocks:true` eure `mock.ts` zuweisen.

```typescript
import mocks from './mocks';

const server = new ApolloServer({
  // ...
  mocks: mocks,
  // ...
});
```

Probiert ruhig noch ein wenig mit Faker.js rum. Es bietet wirklich interessante Möglichkeiten!

## Jest installieren und konfigurieren

Wir wollen unsere Unit Tests mit **jest** und in **Typescript** schreiben. Entsprechend müssen wir folgende Packages hinzufügen:

```bash
yarn add ts-jest jest jest-transform-graphql
yarn add -D @types/jest
```

Wir bnötigen noch eine Jest Konfiguration unter `./jest.config.json`

```json
{
  "roots": ["<rootDir>/tests"],
  "transform": {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "/tests/.*.spec.(js|ts|tsx)?$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
}
```

Zum Schluss erweitern wir unsere `package.json` noch um ein 'test' Script für jest.

```json
"scripts": {
    "start:dev": "npm run build:dev",
    "build:dev": "nodemon 'src/server.ts' --exec 'ts-node' src/server.ts -e ts,graphql --inspect-brk",
    "test": "jest --runInBand --config jest.config.json"
  },
```

## Unit Test implementieren

Wir erzeugen zuerst einen neuen Folder für die Tests `./tests` und dort eine `attendee.spec.ts` nach folgenden Muster um das **attendees** Query zu testen und einen TestServer zu erstellen:

```typescript
let apolloServer: ApolloServer | undefined;

beforeAll(() => {
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  const server = new ApolloServer({
    schema: executableSchema,
    dataSources: () => {
      return {
        speakerDb: new SpeakerData(dbConfig),
        sessionApi: new SessionData(),
        attendeeApi: new AttendeeData(),
      };
    },
    mocks: mocks,
  });

  apolloServer = server;
});

export const GET_ALL_ATTENDEES = gql`
  query GetAllAttendees {
    attendees {
      id
      firstName
      lastName
      emailAddress
      userName
    }
  }
`;

test('Get_All_Attendess_Should_No_Be_Empty', async () => {
  if (apolloServer === undefined) throw new Error('Apollo Server is missing');

  const result = await apolloServer.executeOperation({
    query: GET_ALL_ATTENDEES,
  });
  expect(result.errors).toBeUndefined();
  expect(result.data).toBeDefined();
  expect(result.data?.attendees.length).toBeGreaterThanOrEqual(2);
  expect(result.data?.attendees[0].firstName).toBeDefined();
});
```

## Weitere Tests implementieren

Implementiert nach diesen Vorbild noch die Tests für:

- attendee(attendeeId: ID!): Attendee
- sessions: [Session]
- session(sessionId: ID!): Session

## Ressourcen

- [Faker.js Docu](https://github.com/marak/Faker.js/)
- [Apollo Server - Testing](https://www.apollographql.com/docs/apollo-server/testing/testing/)
- [Apollo Server - Mocking](https://www.apollographql.com/docs/apollo-server/testing/mocking/)