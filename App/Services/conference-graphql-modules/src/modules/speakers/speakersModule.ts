import { createModule, gql } from 'graphql-modules';
import { ISpeaker } from './models/speaker';
import { SpeakersService } from './services/speakersService';
import SpeakersQueryType from './schemas/speakers.graphql';
import resolvers from './resolvers';
import speakerLoader from './services/speakerLoader';

export const speakersModule = createModule({
  id: 'speakers-module',
  dirname: __dirname,
  typeDefs: [SpeakersQueryType],
  resolvers: resolvers,
  providers: [SpeakersService, speakerLoader],
});
