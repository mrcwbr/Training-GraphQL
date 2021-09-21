export interface IAttendee {
    id: number,
    firstName: string,
    lastName: string,
    emailAddress: string, 
    userName: string,
    sessionIds: number[]
}

export interface ICreateAttendeeRequest {
    firstName: string,
    lastName: string,
    emailAddress: string, 
    userName: string,
}