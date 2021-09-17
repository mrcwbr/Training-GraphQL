import { RESTDataSource } from 'apollo-datasource-rest';
import { ApolloError } from 'apollo-server-express';
import { IAttendee, ISession } from '../models';
import { IAttendeeMutationError, ICreateAttendeeRequest } from '../models/attendee';
import { MutationOperation } from '../models/common';

export interface IAttendeeApi {
  allAttendees(): Promise<IAttendee[]>;
  attendeeById(attendeeId: number): Promise<IAttendee>;
  createAttendee(request: ICreateAttendeeRequest): Promise<IAttendee | IAttendeeMutationError>;
  deleteAttendee(attendeeId: number): Promise<Boolean>;
  addAttendeeToSession(attendeeId: number, sessionId: number): Promise<IAttendee>;
}

export default class AttendeeData extends RESTDataSource implements IAttendeeApi {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000';
  }
  deleteAttendee(attendeeId: number): Promise<Boolean> {
    try {
      return this.delete<boolean>(`/attendees/${attendeeId}`);
    } catch (e) {
      console.log(e);
      return new Promise((resolve) => resolve(false));
    }
  }

  attendeeById(attendeeId: number): Promise<IAttendee> {
    return this.get<IAttendee>(`/attendees/${attendeeId}`);
  }

  allAttendees(): Promise<IAttendee[]> {
    return this.get<IAttendee[]>('/attendees');
  }

  createAttendee(request: ICreateAttendeeRequest): Promise<IAttendee | IAttendeeMutationError> {
    try {
      return this.post<IAttendee>('/attendees', {
        firstName: request.firstName,
        lastName: request.lastName,
        emailAddress: request.emailAddress,
        userName: request.userName,
        sessionIds: request.sessionIds,
      });
    } catch (e: any) {
      const error = {
        errorMessage: e.message,
        operation: MutationOperation.Create,
      } as IAttendeeMutationError;

      return new Promise((resolve) => resolve(error));
    }
  }

  addAttendeeToSession(attendeeId: number, sessionId: number): Promise<IAttendee> {
    return this.post<IAttendee>(`/attendees/${attendeeId}/sessions/${sessionId}`);
  }
}
