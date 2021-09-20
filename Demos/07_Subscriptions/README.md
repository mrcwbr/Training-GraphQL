- add subscription server
- add mutation scoped type (addSession / delete)
- add subscription
- add pubSub Event

# Apollo 

## server.ts

import { ApolloServerPluginUsageReporting } from 'apollo-server-core';
import { PubSub } from 'graphql-subscriptions';

dotenv.config({ path: __dirname + '/.env' });

export const pubsub = new PubSub();

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  debug: true,
  dataSources: () => {
    return {
      speakerDb: new SpeakerData(dbConfig),
      sessionApi: new SessionData(),
      attendeeApi: new AttendeeData(),
    };
  },
  validationRules: [depthLimit(7)],
  plugins: [
    ApolloServerPluginUsageReporting({
      sendVariableValues: { all: true },
      sendHeaders: { all: true },
      generateClientInfo: ({ request }) => {
        const headers = request.http && request.http.headers;
        if (headers) {
          return {
            clientName: headers['apollographql-client-name'],
            clientVersion: headers['apollographql-client-version'],
            userAgent: headers['user-agent'],
          };
        } else {
          return {
            clientName: 'Unknown Client',
            clientVersion: 'Unversioned',
            userAgent: 'Unkown userAgent',
          };
        }
      },
    }),
  ]
});

server.installSubscriptionHandlers(httpServer);

app.use(cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));

## typeDefs/index.ts

import SubscriptionTypeDef from './subscription.graphql'

export default [scalars, query, MutationTypeDef, SubscriptionTypeDef, speakerType, SessionTypeDef, AttendeeTypeDef];

## typeDefs/subscription.graphql

type Subscription {
  sessionAttendeesChanged: SessionAttendeeChanged
}

## typeDefs/types/attendee.graphql

enum SessionAttendeeOperation {
  Add,
  Remove
}

## typeDefs/types/session.graphql

type SessionAttendeeChanged {
  newSessionIds: [ID]
  sessions: [Session]
  attendeeId: ID!
  operation: SessionAttendeeOperation
}

## models/session.ts

export enum SessionAttendeeOperation {
  Add = 1,
  Remove = 2,
}

export interface ISessionAttendeeChanged {
  attendeeId: number;
  newSessionIds: number[];
  sessions: ISession[];
  operation: SessionAttendeeOperation;
}

## resolvers/attendeeResolver.ts

import { SessionAttendeeOperation } from '../models/session';
import { pubsub } from '../server';

Mutation: {
    // ...
    attendeeAddSessions: async (parent, args, context, info): Promise<IAttendeeMutationError | IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      const sessionApi: ISessionApi = context.dataSources.sessionApi;

      const attendee = await attendeeApi.addSessions(args.request.attendeeId, args.request.sessionIds);

      const sessionIds = [...(attendee as any).sessionIds, ...args.request.sessionIds];
      const sessions = await sessionApi.sessionsByIds(sessionIds);

      pubsub.publish('ATTENDEE_SESSION_ADDED', {
        sessionAttendeesChanged: {
          newSessionIds: args.request.sessionIds,
          sessions: sessions,
          attendeeId: args.request.attendeeId,
          operation: SessionAttendeeOperation.Add,
        },
      });

      return attendee;
    },

## resolvers/sessionResolver.ts

import { pubsub } from '../server';

Query: {},
Subscription: {
    sessionAttendeesChanged: {
      subscribe: () => pubsub.asyncIterator(['ATTENDEE_SESSION_ADDED']),
    },
  },
Mutation: {}

import { pubsub } from '../server';

# Client App

yarn add subscriptions-transport-ws

## index.tsx

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/subscriptions',
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

## graphql/subscriptions/sessions.ts

import { gql } from '@apollo/client';

export const SESSION_ADDED_TO_ATTENDEE_SUBSCRIPTION = gql`
  subscription OnSessionsAddedToAttendee {
    sessionAttendeesChanged {
      attendeeId
      operation
      newSessionIds
      sessions {
        id
        title
      }
    }
  }
`;

## graphql/models/session.ts

export enum SessionAttendeeoperation {
  Add,
  Remove,
}

export interface ISessionAttendeeChanged {
  attendeeId: number;
  newSessionIds: number[];
  operation: SessionAttendeeoperation,
  sessions: ISessionGraphModel[]
}

## components/attendees/attendee.tsx

 const [sessions, setSessions] = useState<ISessionGraphModel[]>(attendee.sessions);

  const { data } = useSubscription<{ sessionAttendeesChanged: ISessionAttendeeChangedGraphModel }>(SESSION_ADDED_TO_ATTENDEE_SUBSCRIPTION);

  if (data !== undefined && data.sessionAttendeesChanged.attendeeId === attendee.id) {
    if (sessions !== undefined && sessions.length !== data.sessionAttendeesChanged.sessions.length) {
      setSessions(data.sessionAttendeesChanged.sessions);
    }
  }

  ...

  <SessionsList>
          {sessions !== undefined &&
            sessions.map((m) => (
              <SessionsListItem key={m.id}>
                <SessionName>{m.title}</SessionName>
              </SessionsListItem>
            ))}
        </SessionsList>