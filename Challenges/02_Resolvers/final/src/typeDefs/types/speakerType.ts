import { gql } from 'apollo-server-express';

export const speakerType = gql`
  type Speaker {
    id: ID!
    name: String
    bio: String
    webSite: String
  }
`;
