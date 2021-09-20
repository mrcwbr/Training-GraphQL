**attendeeResolvers.ts**

```typescript
import { IAttendeeApi } from '../data/attendeeData';
import { ISessionApi } from '../data/sessionData';
import { IAttendee, ISession } from '../models';

export default {
  Query: {
    attendees: (parent, args, context, info): Promise<IAttendee[]> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.allAttendees();
    },
    attendee: (parent, args, context, info): Promise<IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.attendeeById(args.attendeeId);
    },
  },
  Attendee: {
    sessions: (parent, args, context, info): Promise<ISession[]> => {
      const sessionApi: ISessionApi = context.dataSources.sessionApi;
      return sessionApi.sessionsByIds(parent.sessionIds);
    },
  },
};

```

**sessionResolvers.ts**

```typescript
import { ISessionApi } from '../data/sessionData';
import { ISpeakerApi } from '../data/speakerData';
import { ISession, ISpeaker } from '../models';

export default {
  Query: {
    sessions: (parent, args, context, info): Promise<ISession[]> => {
      const sessionApi: ISessionApi = context.dataSources.sessionApi;
      return sessionApi.allSessions();
    },
    session: (parent, args, context, info): Promise<ISession> => {
      const sessionApi: ISessionApi = context.dataSources.sessionApi;
      return sessionApi.sessionById(args.sessionId);
    },
  },
  Session: {
    speakers: async (parent, args, context, info): Promise<ISpeaker[]> => {
      const speakerDbSvc: ISpeakerApi = context.dataSources.speakerDb;
      const speakers = await speakerDbSvc.getSpeakersByIds(parent.speakerIds);

      return speakers.map((m) => {
        return {
          id: m.Id,
          bio: m.Bio,
          name: m.Name,
          webSite: m.WebSite,
          sessionIds: [],
        } as ISpeaker;
      });
    },
  },
};
```