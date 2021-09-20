**typeDefs/types/session.graphql**

```typescript
type SessionAttendeeChanged {
  newSessionIds: [ID]
  sessions: [Session]
  attendeeId: ID!
  operation: SessionAttendeeOperation
}
```

**typeDefs/types/attendee.graphql**

```typescript
enum SessionAttendeeOperation {
  Add,
  Remove
}
```

**models/session.ts**

```typescript
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
```

**resolvers/attendeeResolvers.ts**

```typescript
// ...
import { pubsub } from '../server';

export default {
  Query: {
    // ...
  },
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
  },
  // ...
};

```

**graphql/subscriptions/session.ts**

```typescript
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
```