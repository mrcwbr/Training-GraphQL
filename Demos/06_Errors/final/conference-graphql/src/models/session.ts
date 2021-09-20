export interface ISession {
  id: number,
  title: string,
  abstract: string,
  startTime: Date,
  endTime: Date,
  speakerIds: number[]
}
