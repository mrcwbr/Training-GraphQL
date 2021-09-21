import { gql } from '@apollo/client';

export const CREATE_ATTENDEE = gql`
  mutation AddAttendee($attendee: CreateAttendeeRequest!) {
    createAttendee(request: $attendee) {
      ... on Attendee {
        id
        firstName
        lastName
        emailAddress
        userName
        sessions {
          id
        }
      }
    }
  }
`;

export const ATTENDEE_ADD_SESSIONS = gql`
  mutation AddSessionsToAttendee($request: AddSessionsToAttendeeRequest!) {
    attendeeAddSessions(request: $request) {
      ... on Attendee {
        id
        sessions {
          id
          title
        }
      }
    }
  }
`;
