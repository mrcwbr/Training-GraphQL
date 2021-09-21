import { merge } from 'lodash';
import attendeeResolvers from "./attendeeResolvers";
import scalarResolvers from './scalarResolvers';
import sessionResolver from './sessionResolver';
import speakerResolvers from "./speakerResolvers";

export default merge(scalarResolvers, speakerResolvers, attendeeResolvers, sessionResolver);
