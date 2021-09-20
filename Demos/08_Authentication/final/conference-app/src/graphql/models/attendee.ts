import { ISessionGraphModel } from './session';

export interface IAttendeeGraphModel {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  sessions: ISessionGraphModel[];
}

export interface ICreateAttendeeGraphRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  sessionIds: number[];
}

export interface IAddSessionsToAttendeeRequest {
  attendeeId: number;
  sessionIds: number[];
}
