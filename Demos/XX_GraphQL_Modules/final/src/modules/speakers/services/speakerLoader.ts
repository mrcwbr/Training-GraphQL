import axios from 'axios';
import DataLoader from 'dataloader';
import { InjectionToken, Scope } from 'graphql-modules';

export const SESSION_SPEAKER_LOADER = new InjectionToken('SESSION_SPEAKER_LOADER');

export default {
  provide: SESSION_SPEAKER_LOADER,
  scope: Scope.Operation,
  useFactory: () => new DataLoader((speakerIds) => sessionSpeakers(speakerIds)),
};

const sessionSpeakers = async (speakerIds) => {
  const speakers = await axios.post(`${process.env.CONFERENCE_API_HOST}/speakers/fromIds`, speakerIds);

  return speakerIds.map((speakerId) => {
    return speakers.data.find((speaker) => speaker.id === speakerId);
  });
};
