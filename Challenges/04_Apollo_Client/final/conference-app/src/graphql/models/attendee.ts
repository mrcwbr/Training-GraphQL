import { ISessionGraphModel } from "./session";

export interface IAttendeeGraphModel {
    id: number,
    firstName: string,
    lastName: string,
    emailAddress: string, 
    userName: string,
    sessions: ISessionGraphModel[]
}