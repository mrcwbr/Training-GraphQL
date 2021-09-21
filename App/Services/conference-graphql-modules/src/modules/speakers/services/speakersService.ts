import { Injectable, Scope } from 'graphql-modules';
import { HTTPCache, RESTDataSource } from 'apollo-datasource-rest';
import { ISpeaker } from '../models/speaker';

export interface ISpeakerService {
  allSpeakers(): Promise<ISpeaker[]>;
  speakerById(id: number): Promise<ISpeaker>;
}

@Injectable({
  scope: Scope.Operation,
})
export class SpeakersService extends RESTDataSource implements ISpeakerService {
  constructor() {
    super();
    this.baseURL = process.env.CONFERENCE_API_HOST;
    this.httpCache = new HTTPCache();
  }

  allSpeakers(): Promise<ISpeaker[]> {
    return this.get<ISpeaker[]>('speakers');
  }

  speakerById(id: number): Promise<ISpeaker> {
    return this.get<ISpeaker>(`speakers/${id}`);
  }
}
