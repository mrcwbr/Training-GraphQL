import { IAttendee } from '.';
import { SessionAttendeeOperation } from './common';

export interface ISession {
  id: number;
  title: string;
  abstract: string;
}

export interface ISessionAttendeeChanged {
  attendee: IAttendee,
  operation: SessionAttendeeOperation
}
