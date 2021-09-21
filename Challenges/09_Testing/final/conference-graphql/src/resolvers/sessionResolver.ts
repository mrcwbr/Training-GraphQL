import { ISessionApi } from '../data/sessionData';
import { ISpeakerApi } from '../data/speakerData';
import { ISession, ISpeaker } from '../models';
import { pubsub } from '../pubSub';

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
  Subscription: {
    sessionAttendeesChanged: {
      subscribe: () => pubsub.asyncIterator(['ATTENDEE_SESSION_ADDED']),
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
  SessionAttendeeOperation: {
    Add: 1,
    Remove: 2,
  },
};
