import { gql } from '@apollo/client';

export const SESSION_ADDED_TO_ATTENDEE_SUBSCRIPTION = gql`
  subscription OnSessionsAddedToAttendee {
    sessionAttendeesChanged {
      attendeeId
      operation
      newSessionIds
      sessions {
        id
        title
      }
    }
  }
`;
