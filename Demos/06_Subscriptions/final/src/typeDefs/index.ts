import { query } from './query';
import { speakerType } from './types/speakerType';
import SessionTypeDef from './types/session.graphql';
import AttendeeTypeDef from './types/attendee.graphql';
import MutationTypeDef from './mutation.graphql';
import CommonTypeDef from './types/common.graphql';
import SubscriptionTypeDef from './subscription.graphql';

export default [query, MutationTypeDef, SubscriptionTypeDef, CommonTypeDef, speakerType, SessionTypeDef, AttendeeTypeDef];
