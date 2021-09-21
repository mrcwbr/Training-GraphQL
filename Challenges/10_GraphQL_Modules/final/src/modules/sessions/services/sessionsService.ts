import { HTTPCache, RESTDataSource } from 'apollo-datasource-rest';
import { Injectable, Scope } from 'graphql-modules';
import { ISession } from '../models/session';

export interface ISessionService {
  allSessions(): Promise<ISession[]>;
  sessionById(sessionId: number): Promise<ISession>;
}

@Injectable({
  scope: Scope.Operation,
})
export class SessionService extends RESTDataSource implements ISessionService {
  constructor() {
    super();
    this.baseURL = process.env.CONFERENCE_API_HOST;
    this.httpCache = new HTTPCache();
  }
  sessionById(sessionId: number): Promise<ISession> {
    return this.get<ISession>(`sessions/${sessionId}`);
  }

  allSessions(): Promise<ISession[]> {
    return this.get<ISession[]>('sessions');
  }
}
