import { ISpeaker } from '../models';

export default {
  Query: {
    speakers: (parent, args, context, info): ISpeaker[] => {
      return [
        {
          id: 1,
          name: 'Peter Pan',
          bio: '',
          webSite: '',
          sessionIds: [],
        },
      ];
    },
    speaker: (parent, args, context, info): ISpeaker => {
      return {
        id: args.speakerId,
        name: 'Peter Pan',
        bio: '',
        webSite: '',
        sessionIds: [],
      };
    },
  },
};
