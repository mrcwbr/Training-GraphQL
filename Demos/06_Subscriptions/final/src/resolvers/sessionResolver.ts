import { GraphQLResolveInfo } from 'graphql';
import { ISessionApi } from '../data/sessionData';
import { ISession } from '../models';
import { pubsub } from '../server';

export default {
  Query: {
    sessions: (parent, args, context, info: GraphQLResolveInfo): Promise<ISession[]> => {
      const sessionApi: ISessionApi = context.dataSources.sessionApi;
      return sessionApi.allSessions();
    },
    session: (parent, args, context, info: GraphQLResolveInfo): Promise<ISession> => {
      const sessionApi: ISessionApi = context.dataSources.sessionApi;
      return sessionApi.sessionById(args.sessionId);
    },
  },
  Subscription: {
    sessionAttendeesChanged: {
      subscribe: () => pubsub.asyncIterator(['ATTENDEE_SESSION_ADDED']),
    },
  },
};
