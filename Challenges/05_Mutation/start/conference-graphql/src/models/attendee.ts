import { ISession } from ".";

export interface IAttendee {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  sessions: ISession[]
}
