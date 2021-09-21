import { query } from './query';
import { speakerType } from './types/speakerType';
import SessionTypeDef from './types/session.graphql'
import AttendeeTypeDef from './types/attendee.graphql'
import { scalars } from './scalars';
import MutationTypeDef from './mutation.graphql'

export default [scalars, query, MutationTypeDef, speakerType, SessionTypeDef, AttendeeTypeDef];
