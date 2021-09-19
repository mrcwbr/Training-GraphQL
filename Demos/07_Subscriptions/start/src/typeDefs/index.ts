import { query } from './query';
import { speakerType } from './types/speakerType';
import SessionTypeDef from './types/session.graphql'
import AttendeeTypeDef from './types/attendee.graphql'
import MutationTypeDef from './mutation.graphql'
import CommonTypeDef from './types/common.graphql'

export default [query, MutationTypeDef, CommonTypeDef, speakerType, SessionTypeDef, AttendeeTypeDef];
