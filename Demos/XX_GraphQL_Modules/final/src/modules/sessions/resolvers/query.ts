import { ISession } from '../models/session';
import { ISessionService, SessionService } from '../services/sessionsService';

export default {
  Query: {
    sessions: async (parent: any, args: any, context: any, info: any): Promise<ISession[]> => {
      const sessionSvc: ISessionService = context.injector.get(SessionService);
      return sessionSvc.allSessions();
    },
    session: async (parent: any, args: any, context: any, info: any): Promise<ISession> => {
      const sessionSvc: ISessionService = context.injector.get(SessionService);
      return sessionSvc.sessionById(args.sessionId);
    },
  },
};
