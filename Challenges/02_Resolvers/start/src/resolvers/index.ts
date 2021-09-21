import { merge } from 'lodash';
import attendeeResolvers from "./attendeeResolvers";
import sessionResolver from './sessionResolver';
import speakerResolvers from "./speakerResolvers";

export default merge(speakerResolvers, attendeeResolvers, sessionResolver);
