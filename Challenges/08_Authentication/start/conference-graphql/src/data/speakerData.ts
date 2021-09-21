import { SQLDataSource } from 'datasource-sql';
import { ISpeaker } from '../models';

const CACHE_MINUTE = 10;
const SPEAKERS_TABLE = 'Speakers';
const SESSIONS_TABLE = 'Sessions';
const SPEAKER_SESSIONS_TABLE = 'SessionSpeaker';

export interface ISpeakerApi {
  getSpeakers(): Promise<ISpeakerDataModel[]>;
  getSpeaker(speakerId: number): Promise<ISpeakerDataModel | undefined>;
  getSpeakerSessions(speakerId: number): Promise<ISessionDataModel[]>;
  getSpeakersByIds(speakerIds: number[]): Promise<ISpeakerDataModel[]>;
}

export interface ISpeakerDataModel {
  Id: number;
  Name: string;
  Bio: string;
  WebSite: string;
}

export interface ISessionDataModel {
  Id: number;
  Title: string;
  Abstract: string;
  StartTime: Date;
  EndTime: Date;
  SpeakerIds: number[];
}

class SpeakerData extends SQLDataSource implements ISpeakerApi {
  async getSpeakerSessions(speakerId: number): Promise<ISessionDataModel[]> {
    return await this.knex<ISpeakerDataModel>(SPEAKER_SESSIONS_TABLE).join(SESSIONS_TABLE, `${SPEAKER_SESSIONS_TABLE}.SessionId`, '=', `${SESSIONS_TABLE}.Id`).where(`${SPEAKER_SESSIONS_TABLE}.SpeakerId`, speakerId).select(`${SESSIONS_TABLE}.*`);
  }
  async getSpeakers(): Promise<ISpeakerDataModel[]> {
    return await this.knex<ISpeakerDataModel>(SPEAKERS_TABLE);
  }

  async getSpeaker(speakerId: number): Promise<ISpeakerDataModel | undefined> {
    return await this.knex<ISpeakerDataModel>(SPEAKERS_TABLE).where({ Id: speakerId }).first();
  }

  async getSpeakersByIds(speakerIds: number[]): Promise<ISpeakerDataModel[]> {
    return await this.knex<ISpeakerDataModel>(SPEAKERS_TABLE).whereIn('Id', speakerIds);
  }
}

export default SpeakerData;
