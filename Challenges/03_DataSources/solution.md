# Lösungen zu Challenge 3

## DataSources

**speakerData.ts**

```typescript
import { SQLDataSource } from 'datasource-sql';

const SPEAKERS_TABLE = 'Speakers';
const SESSIONS_TABLE = 'Sessions';
const SPEAKER_SESSIONS_TABLE = 'SessionSpeaker';

export interface ISpeakerApi {
  getSpeakers(): Promise<ISpeakerDataModel[]>;
  getSpeaker(speakerId: number): Promise<ISpeakerDataModel | undefined>;
  getSpeakerSessions(speakerId: number): Promise<ISessionDataModel[]>;
}

export interface ISpeakerDataModel {
  Id: number;
  Name: string;
  Bio: string;
  WebSite: string;
}

export interface ISessionDataModel {
  Id: number;
  Title: string;
  Abstract: string;
}

class SpeakerData extends SQLDataSource implements ISpeakerApi {
  async getSpeakerSessions(speakerId: number): Promise<ISessionDataModel[]> {
    return await this.knex<ISpeakerDataModel>(SPEAKER_SESSIONS_TABLE).join(SESSIONS_TABLE, `${SPEAKER_SESSIONS_TABLE}.SessionId`, '=', `${SESSIONS_TABLE}.Id`).where(`${SPEAKER_SESSIONS_TABLE}.SpeakerId`, speakerId).select(`${SESSIONS_TABLE}.*`);
  }
  async getSpeakers(): Promise<ISpeakerDataModel[]> {
    return await this.knex<ISpeakerDataModel>(SPEAKERS_TABLE);
  }

  async getSpeaker(speakerId: number): Promise<ISpeakerDataModel | undefined> {
    return await this.knex<ISpeakerDataModel>(SPEAKERS_TABLE).where({ Id: speakerId }).first();
  }
}

export default SpeakerData;

```

**attendeData.ts**

```typescript
import { RESTDataSource } from 'apollo-datasource-rest';
import { IAttendee } from '../models';

export interface IAttendeeApi {
  allAttendees(): Promise<IAttendee[]>;
  attendeeById(sessionId: number): Promise<IAttendee>;
}

export default class AttendeeData extends RESTDataSource implements IAttendeeApi {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000';
  }

  attendeeById(sessionId: number): Promise<IAttendee> {
    return this.get<IAttendee>(`/attendees/${sessionId}`);
  }

  allAttendees(): Promise<IAttendee[]> {
    return this.get<IAttendee[]>('/attendees');
  }
}

```

**sessionData.ts**

```typescript
import { RESTDataSource } from 'apollo-datasource-rest';
import { ISession } from '../models';

export interface ISessionApi {
  allSessions(): Promise<ISession[]>;
  sessionById(sessionId: number): Promise<ISession>;
}

export default class SessionData extends RESTDataSource implements ISessionApi {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000';
  }

  sessionById(sessionId: number): Promise<ISession> {
    return this.get<ISession>(`/sessions/${sessionId}`);
  }

  allSessions(): Promise<ISession[]> {
    return this.get<ISession[]>('/sessions');
  }
}
```

**speakerResolvers.ts**

```typescript
export default {
  Query: {
    speakers: async (parent, args, context, info): Promise<ISpeaker[]> => {
      const speakerDbSvc: ISpeakerApi = context.dataSources.speakerDb;
      const speakers = await speakerDbSvc.getSpeakers();

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
    speaker: async (parent, args, context, info): Promise<ISpeaker> => {
      const speakerDbSvc: ISpeakerApi = context.dataSources.speakerDb;
      const speaker = await speakerDbSvc.getSpeaker(args.speakerId);

      return {
        id: speaker?.Id,
        name: speaker?.Name,
        bio: speaker?.Bio,
        webSite: speaker?.WebSite,
        sessionIds: [],
      } as ISpeaker;
    },
  },
  Speaker: {
    sessions: async (parent, args, context, info): Promise<ISession[]> => {
      const speakerDbSvc: ISpeakerApi = context.dataSources.speakerDb;
      const sessions = await speakerDbSvc.getSpeakerSessions(parent.id);

      return sessions.map((m) => {
        return {
          id: m.Id,
          abstract: m.Abstract,
          title: m.Title,
        };
      });
    },
  },
};
```

**attendeeResolvers.ts**

```typescript
import { IAttendeeApi } from '../data/attendeeData';
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
};
```

**sessionResolvers.ts**

```typescript
import { IAttendeeApi } from '../data/attendeeData';
import { IAttendee } from '../models';

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
};
```