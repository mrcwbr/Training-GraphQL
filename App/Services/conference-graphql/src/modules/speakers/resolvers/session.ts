import { SESSION_SPEAKER_LOADER } from '../services/speakerLoader';

export default {
  Session: {
    async speakers(session, args, context, info) {
      if (session.speakerIds === undefined) return [];

      const speakers = await context.injector.get(SESSION_SPEAKER_LOADER).loadMany(session.speakerIds);
      return speakers;
    },
  },
};
