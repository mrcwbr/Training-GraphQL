import { RESTDataSource } from 'apollo-datasource-rest';
import { IAttendee, ISession } from '../models';
import { AttendeeMutationOperation, IAttendeeMutationError, ICreateAttendeeRequest } from '../models/attendee';

export interface IAttendeeApi {
  allAttendees(): Promise<IAttendee[]>;
  attendeeById(sessionId: number): Promise<IAttendee>;
  createAttendee(request: ICreateAttendeeRequest): Promise<IAttendee | IAttendeeMutationError>;
  deleteAttendee(attendeeId: number): Promise<Boolean | IAttendeeMutationError>;
  addSessions(attendeeId: number, sessionIds: number[]): Promise<IAttendee | IAttendeeMutationError>;
}

export default class AttendeeData extends RESTDataSource implements IAttendeeApi {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.user.token}`);
  }

  attendeeById(sessionId: number): Promise<IAttendee> {
    return this.get<IAttendee>(`/attendees/${sessionId}`);
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
        operation: AttendeeMutationOperation.Create,
      } as IAttendeeMutationError;

      return new Promise((resolve) => resolve(error));
    }
  }

  deleteAttendee(attendeeId: number): Promise<Boolean | IAttendeeMutationError> {
    try {
      return this.delete<boolean>(`/attendees/${attendeeId}`);
    } catch (e: any) {
      const error = {
        errorMessage: e.message,
        operation: AttendeeMutationOperation.Delete,
      } as IAttendeeMutationError;

      return new Promise((resolve) => resolve(error));
    }
  }

  addSessions(attendeeId: number, sessionIds: number[]): Promise<IAttendee | IAttendeeMutationError> {
    try {
      sessionIds.forEach((sessionId) => {
        this.post<IAttendee>(`/attendees/${attendeeId}/sessions/${sessionId}`);
      });

      return this.attendeeById(attendeeId);
    } catch (e: any) {
      const error = {
        errorMessage: e.message,
        operation: AttendeeMutationOperation.Delete,
      } as IAttendeeMutationError;

      return new Promise((resolve) => resolve(error));
    }
  }
}
