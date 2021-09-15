import { gql } from 'apollo-server-express';

export const query = gql`
    type Query {
        speakers: [Speaker],
        speaker(speakerId: ID!): Speaker
    }
`