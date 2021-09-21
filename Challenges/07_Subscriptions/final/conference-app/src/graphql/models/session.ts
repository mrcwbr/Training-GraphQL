import { ISpeakerGraphModel } from './speaker';

export interface ISessionGraphModel {
  id: number;
  title: string;
  abstract: string;
  startTime: Date;
  endTime: Date;
  speakers: [ISpeakerGraphModel];
}

export enum SessionAttendeeoperation {
  Add,
  Remove,
}

export interface ISessionAttendeeChangedGraphModel {
  attendeeId: number;
  newSessionIds: number[];
  operation: SessionAttendeeoperation,
  sessions: ISessionGraphModel[]
}