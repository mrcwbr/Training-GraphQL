import { RESTDataSource } from 'apollo-datasource-rest';
import { IAttendee } from '../models';

export interface IAttendeeApi {
  allAttendees(): Promise<IAttendee[]>;
  attendeeById(sessionId: number): Promise<IAttendee>;
}

export default class AttendeeData extends RESTDataSource implements IAttendeeApi {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000';
  }

  attendeeById(sessionId: number): Promise<IAttendee> {
    return this.get<IAttendee>(`/attendees/${sessionId}`);
  }

  allAttendees(): Promise<IAttendee[]> {
    return this.get<IAttendee[]>('/attendees');
  }
}
