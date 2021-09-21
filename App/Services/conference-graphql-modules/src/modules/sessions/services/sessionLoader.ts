import axios from 'axios';
import DataLoader from 'dataloader';
import { InjectionToken, Scope } from 'graphql-modules';

export const SPEAKER_SESSION_LOADER = new InjectionToken('SPEAKER_SESSION_LOADER');

export default {
  provide: SPEAKER_SESSION_LOADER,
  scope: Scope.Operation,
  useFactory: () => new DataLoader((sessionIds) => speakersSessions(sessionIds)),
};

const speakersSessions = async (sessionIds) => {
  const sessions = await axios.post(`${process.env.CONFERENCE_API_HOST}/sessions/fromIds`, sessionIds);

  return sessionIds.map((sessionId) => {
    return sessions.data.find((session) => session.id === sessionId);
  });
};
