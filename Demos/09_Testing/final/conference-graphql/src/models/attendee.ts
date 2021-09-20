import { ISession } from '.';

export interface IAttendee {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  sessions: ISession[];
}

export enum AttendeeMutationOperation {
  Create = 1,
  Delete = 2,
  AddSession = 3,
}

export interface IAttendeeMutationError {
  attendeeId?: string,
  operation: AttendeeMutationOperation,
  errorMessage: string
}

export interface ICreateAttendeeRequest {
  firstName: string,
  lastName: string,
  emailAddress: string,
  userName: string,
  sessionIds: number[]
}