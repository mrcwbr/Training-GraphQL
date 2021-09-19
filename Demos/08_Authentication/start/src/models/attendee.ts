import { MutationOperation } from "./common";

export interface IAttendee {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  sessionIds: number[]
}

export interface IAttendeeMutationError {
  attendeeId?: string,
  operation: MutationOperation,
  errorMessage: string
}

export interface ICreateAttendeeRequest {
  firstName: string,
  lastName: string,
  emailAddress: string,
  userName: string,
  sessionIds: number[]
}