import { GraphQLResolveInfo } from 'graphql';
import { ISpeakerApi } from '../data/speakerData';
import { ISession, ISpeaker } from '../models';

export default {
  Query: {
    speakers: async (parent, args, context, info: GraphQLResolveInfo): Promise<ISpeaker[]> => {
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
    speaker: async (parent, args, context, info: GraphQLResolveInfo): Promise<ISpeaker> => {
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
    sessions: async (parent: ISpeaker, args, context, info): Promise<ISession[]> => {
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
