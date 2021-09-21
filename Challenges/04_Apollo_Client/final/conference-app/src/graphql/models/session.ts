import { ISpeakerGraphModel } from './speaker';

export interface ISessionGraphModel {
  id: number;
  title: string;
  abstract: string;
  startTime: Date;
  endTime: Date;
  speakers: ISpeakerGraphModel[];
}
