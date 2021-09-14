import { gql } from 'apollo-server-express';

export const SpeakerTypeDefs = gql`
  type Query {
    helloWorld: String!
  }
`;