import { HTTPCache, RESTDataSource } from 'apollo-datasource-rest';
import { Injectable, Scope } from 'graphql-modules';
import { IAttendee, ICreateAttendee } from '../models/attendee';

export interface IAttendeeService {
  allAttendees(): Promise<IAttendee[]>;
  attendeeById(attendeeId: number): Promise<IAttendee>;
  createAttendee(attendee: ICreateAttendee): Promise<IAttendee>;
}

@Injectable({
  scope: Scope.Operation,
})
export class AttendeeService extends RESTDataSource implements IAttendeeService {
  constructor() {
    super();
    this.baseURL = process.env.CONFERENCE_API_HOST;
    this.httpCache = new HTTPCache();
  }
  createAttendee(attendee: ICreateAttendee): Promise<IAttendee> {
    return this.post<IAttendee>('attendees', attendee);
  }
  allAttendees(): Promise<IAttendee[]> {
    return this.get<IAttendee[]>('attendees');
  }
  attendeeById(attendeeId: number): Promise<IAttendee> {
    return this.get<IAttendee>(`attendees/${attendeeId}`);
  }
}
