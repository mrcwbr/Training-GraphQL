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
