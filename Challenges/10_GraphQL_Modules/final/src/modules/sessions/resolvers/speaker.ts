import { SPEAKER_SESSION_LOADER } from '../services/sessionLoader';

export default {
  Speaker: {
    async sessions(speaker, args, context, info) {
      if (speaker.sessionIds === undefined) return [];

      const sessions = await context.injector.get(SPEAKER_SESSION_LOADER).loadMany(speaker.sessionIds);
      return sessions;
    },
  },
};
