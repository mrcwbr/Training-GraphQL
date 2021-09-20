# Lösungen zu Challegne #2:

## Queries

```typescript
type Query {
    speakers: [Speaker],
    speaker(speakerId: ID!): Speaker,

    attendees: [Attendee],
    attendee(attendeeId: ID!): Attendee,

    sessions: [Session],
    session(sessionId: ID!): Session
}
```

## Types

```typescript
type Attendee {
    id: ID!
    firstName: String
    lastName: String
    emailAddress: String
    userName: String
}

type Session {
    id: ID!,
    title: String,
    abstract: String
}

type Speaker {
    id: ID!
    name: String
    bio: String
    webSite: String
}
```

## Resolver

**attendeeResolvers.ts**

```typescript
import { IAttendee } from '../models';

export default {
  Query: {
    attendees: (parent, args, context, info): IAttendee[] => {
      return [
        {
          id: 1,
          firstName: 'Peter',
          lastName: 'Pan',
          emailAddress: 'peter.pan@hello.de',
          userName: 'peter.pan',
        },
      ];
    },
    attendee: (parent, args, context, info): IAttendee => {
      return {
        id: args.attendeeId,
        firstName: 'Peter',
        lastName: 'Pan',
        emailAddress: 'peter.pan@hello.de',
        userName: 'peter.pan',
      };
    },
  },
};
```

**sessionResolvers.ts**

```typescript
import { ISession } from "../models";

export default {
    Query: {
        sessions: (parent, args, context, info): ISession[] => {
          return [
            {
              id: 1,
              title: 'First Session',
              abstract: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
            },
          ];
        },
        session: (parent, args, context, info): ISession => {
          return {
            id: args.sessionId,
            title: 'First Session',
            abstract: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
          };
        },
      },
}
```