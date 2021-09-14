import { ISpeaker } from "../models/speaker";
import { ISpeakerService, SpeakersService } from "../services/speakersService";

export default {
    Query: {
        speakers: async (parent: any, args: any, context: any, info: any): Promise<ISpeaker[]> => {
          const speakerSvc: ISpeakerService = context.injector.get(SpeakersService);
          return speakerSvc.allSpeakers();
        },
        speaker: async (parent: any, args: any, context: any, info: any): Promise<ISpeaker> => {
          const speakerSvc: ISpeakerService = context.injector.get(SpeakersService);
          return speakerSvc.speakerById(args.speakerId);
        },
      }
}