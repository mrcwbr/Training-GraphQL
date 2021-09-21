import { ISessionApi } from '../data/sessionData';
import { ISession } from '../models';

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
};
