import { RESTDataSource } from 'apollo-datasource-rest';
import { ISession } from '../models';

export interface ISessionApi {
  allSessions(): Promise<ISession[]>;
  sessionById(sessionId: number): Promise<ISession>;
  sessionByIds(sessionIds: number[]): Promise<ISession[]>;
}

export default class SessionData extends RESTDataSource implements ISessionApi {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000';
  }
  sessionByIds(sessionIds: number[]): Promise<ISession[]> {
    return this.post<ISession[]>('/sessions/fromIds', sessionIds);
  }

  sessionById(sessionId: number): Promise<ISession> {
    return this.get<ISession>(`/sessions/${sessionId}`);
  }

  allSessions(): Promise<ISession[]> {
    return this.get<ISession[]>('/sessions');
  }
}
