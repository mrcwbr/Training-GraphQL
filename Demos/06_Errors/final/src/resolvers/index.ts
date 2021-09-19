import { merge } from 'lodash';
import attendeeResolvers from "./attendeeResolvers";
import commonResolvers from './commonResolvers';
import sessionResolver from './sessionResolver';
import speakerResolvers from "./speakerResolvers";

export default merge(commonResolvers, speakerResolvers, attendeeResolvers, sessionResolver);
