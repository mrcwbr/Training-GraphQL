import { gql } from '@apollo/client';

export const GET_ALL_ATTENDEES = gql`
  query GetAllAttendees {
    attendees {
      id
      firstName
      lastName
      emailAddress
      userName
      sessions {
        id
        title
      }
    }
  }
`;
