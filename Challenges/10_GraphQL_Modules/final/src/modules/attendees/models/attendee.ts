export interface IAttendee {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    emailAddress: string
}

export interface ICreateAttendee {
    firstName: string,
    lastName: string,
    userName: string,
    emailAddress: string,
    sessionIds: number[]
}