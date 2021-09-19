import { ISessionGraphModel } from "./session";

export interface ISpeakerGraphModel {
    id: number;
    name: string;
    bio: string;
    webSite: string;
    sessions: ISessionGraphModel[];
}