import { createModule } from 'graphql-modules';
import resolvers from './resolvers';
import AttendeeQueryType from './schemas/attendee.graphql';
import { AttendeeService } from './services/attendeeService';

export const attendeeModule = createModule({
  id: 'attendee-module',
  dirname: __dirname,
  typeDefs: [AttendeeQueryType],
  resolvers: resolvers,
  providers: [AttendeeService],
});
