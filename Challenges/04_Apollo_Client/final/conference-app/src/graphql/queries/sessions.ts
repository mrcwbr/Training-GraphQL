import { gql } from '@apollo/client';

export const GET_ALL_SESSION_QUERY = gql`
  query GetAllSessions {
    sessions {
      id
      title
      abstract
      startTime
      endTime
      speakers {
          id
      }
    }
  }
`;

export const GET_SESSION_LOOKUP = gql`
  query GetAllSessions {
    sessions {
      id
      title
    }
  }
`;