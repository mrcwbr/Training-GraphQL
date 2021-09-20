# Challenge #4: Custom Scalar Type & Apollo Client

## Ziel

In dieser Übung verfolgen wir zwei Ziele.

1. Wir implementieren einen eigenen Scalar Datentypen für `Date` in unserem Apollo Server und binden diesen im `Session` Schema ein.
2. Wir bauen die React Application auf den GraphQL Client um, damit wir unsere Daten nicht mehr von der REST API laden müssen.

## Erweitern des Session & Attendee Types

wir erweitern das `Session` Schema und eine Liste der Sprecher. So das wir alle Sprecher für eine Session laden können.

Das `Attendee` Schema erweitern wir um `Sessions`, um die Sessions der Teilnehmer laden zu können.

```typescript
type Session {
    id: ID!,
    title: String,
    abstract: String,
    startTime: Date,
    endTime: Date,
    speakers: [Speaker]
}

type Attendee {
    id: ID!
    firstName: String
    lastName: String
    emailAddress: String
    userName: String
    sessions: [Session]
}
```

In der letzten Übung, haben wir dies bereits für `Speaker` umgesetzt. Nun müsst ihr das ebenfalls im `SessionResolver` und `AttendeeResolver` anwenden.

> Die Lösungen für die Resolver findet ihr in der solutions.md

## Date Datentyp anlegen

Um die Start und Endzeit für eine `Session` übermitteln zu können, legen wir uns nun einen eigenen `Date` Datentyp an.

Erstellt euch ein neues File `typeDefs/scalars.ts` und bindet es in die `typeDefs/index.ts` ein.

Die Definition des Schema sieht aus wie folgt:

```typescript
import { gql } from 'apollo-server-express';

export const scalars = gql`
  scalar Date
`;
```

Nun könnt ihr das `Session` Schema um `startTime: Date` und `endTime: Date` erweitern

Für diesen Scalar Type benötigt ihr noch einen eigenen Resolver, der sich um die Formatierung/Konvertierung des Datumswertes kümmert. Eine gute Hilfe findet ihr in den [Apollo Docs](https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#example-the-date-scalar)

**Wichtig:** Der Rückgabewert von Date soll eine String im ISO Format sein.

## Apollo Client in der React App einbinden

Die React Application findet ihr unter `start/conference-app`. Führt zuerst ein `yarn install` durch und anschliessend könnt ihr die App per `yarn start` starten. Die läuft unter http://localhost:4000

> Ihr müsst euch beim ersten Aufruf einen Account anlegen (SignUp). Diesen benötigen wir später noch für die Authentifizierung Übung.

Um dem Apollo Client nutzen zu können, benötigt ihr zu erst das Package `@apollo/client` und `graphql`

Damit ihr den ApolloClient in den Components nutzen könnt, müsst ihr zuerst einen `ApolloProvider` um eure Application bauen. Öffnet dazu die `index.tsx` zieht dort den ApolloProvider ein. Wie das funktioniert, findet ihr in den [Apollo Docs](https://www.apollographql.com/docs/react/get-started/#3-connect-your-client-to-react).

## GraphQL Models und Queries anlegen.

Erzeugt euch einen Folder `src/graphql`. Dort legt ihr zwei weitere Ordner an: `models` und `queries`.

### models

In dem `models` Folder legt ihr euch bitte drei `interfaces` für das Attendee, Speaker und Session Schema an. Es repräsentiert euer GraphQL Schema.

Beispiel `Attendee`:

```typescript
import { ISessionGraphModel } from "./session";

export interface IAttendeeGraphModel {
    id: number,
    firstName: string,
    lastName: string,
    emailAddress: string, 
    userName: string,
    sessions: ISessionGraphModel[]
}
```

### queries

In dem `queries` Folder legt ihr drei Files für Attendee, Session und Speaker Queries an. In den Dateien implementiert ihr euch Queries, die Ihr für die React Applikation benötigt. Schaut auch dazu die React Components an.

Hier das Beispiel für `Attendee`:

```typescript
import { gql } from '@apollo/client';

export const GET_ALL_ATTENDEES = gql`
  query GetAllAttendees {
    attendees {
      id
      firstName
      lastName
      emailAddress
      userName
      sessions {
        id
        title
      }
    }
  }
`;
```

## Ausführen der Queries und ersetzen der REST API

In den folgenden Components werden aktuell REST API Aufrufe getätigt, welche ihr durch GraphQL Calls ersetzen könnt:

- Talks.tsx
- Speakers.tsx
- Attendees.tsx
- Attendee.tsx

Um Daten von eurem GraphQL Server abzufragen benötigt ihr den `useQuery` Hook.

Informationen dazu findet ihr den [Apollo Docs](https://www.apollographql.com/docs/react/data/queries/)

Als Beispiel die Implementierung für `Talks.tsx`:

```typescript
  const { loading, error, data } = useQuery<{ sessions: ISessionGraphModel[] }>(GET_ALL_SESSION_QUERY);

  if (error) return <>ERROR</>;

  if (loading) return <>LOADING</>;

  if (data === undefined || data.sessions.length === 0) return <>NO ITEMS</>;
```

> Die Lösungen könnt ihr in `final/conference-app` finden.

## Ressourcen

- [GraphQL Custom Scalar Types](https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/)
- [Resolver Chains](https://www.apollographql.com/docs/apollo-server/data/resolvers/#passing-resolvers-to-apollo-server)
- [Apollo Client - Installation](https://www.apollographql.com/docs/react/get-started/)
- [Apollo Client - Queries](https://www.apollographql.com/docs/react/data/queries/)