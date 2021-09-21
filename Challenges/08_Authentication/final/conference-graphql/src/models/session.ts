import { IAttendee } from '.';

export interface ISession {
  id: number;
  title: string;
  abstract: string;
  startTime: Date;
  endTime: Date;
  speakerIds: number[];
}

export enum SessionAttendeeOperation {
  Add = 1,
  Remove = 2,
}

export interface ISessionAttendeeChanged {
  attendeeId: number;
  newSessionIds: number[];
  sessions: ISession[];
  operation: SessionAttendeeOperation;
}
