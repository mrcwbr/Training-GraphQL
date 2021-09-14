import { SPEAKER_SESSION_LOADER } from '../services/sessionLoader';

export default {
  Attendee: {
    async sessions(attendee, args, context, info) {
      if (attendee.sessionIds === undefined) return [];

      const sessions = await context.injector.get(SPEAKER_SESSION_LOADER).loadMany(attendee.sessionIds);
      return sessions;
    },
  }
};
