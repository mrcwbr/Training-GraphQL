import { makeExecutableSchema } from '@graphql-tools/schema';
import { SpeakerTypeDefs } from "./schema/speakerSchema";
import SpeakerResolvers from "./service/speakerResolver";

export const schema = makeExecutableSchema({
  typeDefs: SpeakerTypeDefs,
  resolvers: SpeakerResolvers
});