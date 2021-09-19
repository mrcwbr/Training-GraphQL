import axios from 'axios';
import { IAttendee, ICreateAttendeeRequest } from '../models/attendee';
import { ISession } from '../models/session';
import { ISpeaker } from '../models/speaker';

const HOST = 'http://localhost:5000';

export const getSpeakers = async (): Promise<ISpeaker[]> => {
  const speakers = await axios.get<ISpeaker[]>(`${HOST}/speakers`);
  return speakers.data;
};

export const getSessions = async (): Promise<ISession[]> => {
  const sessions = await axios.get<ISession[]>(`${HOST}/sessions`);
  return sessions.data;
};

export const getAttendees = async (): Promise<IAttendee[]> => {
  const attendees = await axios.get<IAttendee[]>(`${HOST}/attendees`);
  return attendees.data;
};

export const getSessionsByIds = async (sessionIds: number[]): Promise<ISession[]> => {
  const sessions = await axios.post<ISession[]>(`${HOST}/sessions/fromIds`, sessionIds);
  return sessions.data;
};

export const addAttendee = async (request: ICreateAttendeeRequest): Promise<IAttendee> => {
  const attendee = await axios.post<IAttendee>(`${HOST}/attendees`, request);
  return attendee.data;
};

export const addSessions = async (attendeeId: number, sessionIds: number[]) => {
  sessionIds.forEach(async (sessionId) => {
    await axios.post<IAttendee>(`${HOST}/attendees/${attendeeId}/sessions/${sessionId}`);
  });
};
