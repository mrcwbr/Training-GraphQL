# Challenge #7: Subscriptions

## Ziel

In den letzten Übungen haben wir `Queries` und `Mutation` kennengelernt. Jetzt wollen wir uns den dritte Pfeiler näher ansehen: `Subscription`. Subscriptions erlauben es abonnierten Clients Events zuzustellen.

Wir werden zuerst den Apollo Server um Subscriptions erweitern und danach die Subscriptions in der React App abonnieren.

### Apollo Server um Subscriptions erweitern

Wir passen zuerst unsere `server.ts` an und binden den Subscription Server ein.

```typescript
//...

export const pubsub = new PubSub();

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  // Konfiguration bleibt identisch
});

server.installSubscriptionHandlers(httpServer);

app.use(cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
```

In erweitern wir die `typeDefs` um Subscriptions. Dazu erstellen wir die Datei `typeDefs/subscription.graphql`

```typescript
type Subscription {
  sessionAttendeesChanged: SessionAttendeeChanged
}
```

In der `typeDef/types/session.graphql` fügen wir den `SessionAttendeeChanged` Type hinzu. Der soll folgende Informationen beinhalten:

- Die neu hinzugefügen SessionIds
- ID des Teilnehmers
- Die Operation (Enum) mit Add oder Remove
- Eine Liste aller Sessions für die TeilnehmerId

> In der `solutions.md` findet ihr die Auflösung zu `SessionAttendeeChanged`. Weitere Informationen zu Subscriptions gibt es in den [Apollo Docs](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

### Event erstellen

Im `resolvers/attendeeResolvers.ts` findet ihr die Mutation `attendeeAddSessions`. Importiert dort den `pubSub` aus dem `server.ts` und publish ein Event.

Dazu benötigt ihr einen eindeutigen Namen (z.B. `ATTENDEE_SESSION_ADDED`) und ein Objekt mit den Daten für `SessionAttendeeChanged`, wofür ich vorab noch ein Interface in `models/session.ts` anlegt.

### Event veröffentlichen

Im `resolvers/sessionResolvers.ts` benötigt es einen neuen Bereich `Subscription`, wo ihr das Event veröffentlich, was ihr vorher in `attendeeAddSessions` erstellt habt.

```typescript
export default {
  Query: {
    // ...
  },
  Subscription: {
    sessionAttendeesChanged: {
      subscribe: () => pubsub.asyncIterator(['ATTENDEE_SESSION_ADDED']),
    },
  },
  Session: {
    // ...
  },
  SessionAttendeeOperation: {
    Add: 1,
    Remove: 2,
  },
};
```

## Events in React Client subscripen

In der React App müssen wir zuerst das ws transport Package hinzufügen:

```bash
yarn add subscriptions-transport-ws
```

In der `index.tsx` müssen wir den ApolloProvider nun erweitern, damit er auch die Subscription Informationen enthält.

```typescript
// ..

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

// ...
```

In `graphql/subscriptions/sessions.ts` hinterlegen wir nun eine Abfrage für die Subscription. Wie man diese baut finder ihr in den Apollo Docs oder in `solutions.md`

Danach müsst ihr noch `graphql/models/session.ts` um die beiden Interfaces für `SessionAttendeeOperation` und `SessionAttendeeChanged` erweitern.

Der letzte Schritt ist nun die Component `Attendee` anzupassen. Hier müssen wir mit dem `useSubscription` Hook uns auf die Subscription abonnieren.

```typescript
const [sessions, setSessions] = useState<ISessionGraphModel[]>(attendee.sessions);

const { data } = useSubscription<{ sessionAttendeesChanged: ISessionAttendeeChangedGraphModel }>(SESSION_ADDED_TO_ATTENDEE_SUBSCRIPTION);

if (data !== undefined && data.sessionAttendeesChanged.attendeeId === attendee.id) {
  if (sessions !== undefined && sessions.length !== data.sessionAttendeesChanged.sessions.length) {
    setSessions(data.sessionAttendeesChanged.sessions);
  }
}

  return (
    <AttendeeCard>
      // ..
      <AttendeeSessions display={'flex'} flexDirection={'column'}>
        <SessionsHeading>Sessions</SessionsHeading>
        <SessionsList>
          {sessions !== undefined &&
            sessions.map((m) => (
              <SessionsListItem key={m.id}>
                <SessionName>{m.title}</SessionName>
              </SessionsListItem>
            ))}
        </SessionsList>
      </AttendeeSessions>
      // ..
    </AttendeeCard>
  );

  // ...
};
```

## Ressourcen

- [Apollo Server - Subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)
- [Apollo Client - Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/)
