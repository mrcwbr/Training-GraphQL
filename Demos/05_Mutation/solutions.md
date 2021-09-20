**typeDefs/mutation.graphql**

```typescript
type Mutation {
  createAttendee(request: CreateAttendeeRequest!): AttendeeMutationResponse
  attendeeAddSessions(request: AddSessionsToAttendeeRequest!): AttendeeMutationResponse
  deleteAttendee(attendeeId: ID!): AttendeeMutationResponse
}
```

**typeDefs/types/attendee.graphql**

```typescript
enum AttendeeMutationOperation {
  Create
  Delete
  AddSession
}

type AttendeeMutationError {
  operation: AttendeeMutationOperation
  attendeeId: ID
  errorMessage: String
}
union AttendeeMutationResponse = Attendee | AttendeeMutationError

input CreateAttendeeRequest {
  firstName: String!
  lastName: String!
  emailAddress: String!
  userName: String!
  sessionIds: [Int]
}

input AddSessionsToAttendeeRequest {
  attendeeId: ID!
  sessionIds: [Int]
}
``` 

**attendeeResolvers.ts**

```typescript
import { IAttendeeApi } from '../data/attendeeData';
import { ISessionApi } from '../data/sessionData';
import { IAttendee, ISession } from '../models';
import { IAttendeeMutationError } from '../models/attendee';

export default {
  Query: {
    attendees: (parent, args, context, info): Promise<IAttendee[]> => {
      // Already implemented
    },
    attendee: (parent, args, context, info): Promise<IAttendee> => {
      // Already implemented
    },
  },
  Mutation: {
    createAttendee: (parent, args, context, info): Promise<IAttendeeMutationError | IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.createAttendee(args.request);
    },
    deleteAttendee: (parent, args, context, info): Promise<IAttendeeMutationError | Boolean> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.deleteAttendee(args.attendeeId);
    },
    attendeeAddSessions: (parent, args, context, info): Promise<IAttendeeMutationError | IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.addSessions(args.request.attendeeId, args.request.sessionIds);
    },
  },
  Attendee: {
    sessions: (parent, args, context, info): Promise<ISession[]> => {
      // Already implemented
    },
  },
  AttendeeMutationOperation: {
    Create: 1,
    Delete: 2,
    AddSession: 3,
  },
  AttendeeMutationResponse: {
    __resolveType(obj: IAttendeeMutationError | IAttendee, context, info) {
      if (obj.hasOwnProperty('errorMessage')) {
        return 'AttendeeMutationError';
      }

      if (obj.hasOwnProperty('id')) {
        return 'Attendee';
      }

      return null;
    },
  },
};

```