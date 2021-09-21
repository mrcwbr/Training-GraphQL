import { gql } from '@apollo/client';

export const GET_ALL_SPEAKERS = gql`
  query GetAllSpeakers {
    speakers {
      id
      name
      webSite
      sessions {
        id
      }
    }
  }
`;
