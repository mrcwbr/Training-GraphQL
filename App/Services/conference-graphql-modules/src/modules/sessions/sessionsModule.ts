import { createModule } from 'graphql-modules';
import resolvers from './resolvers';
import SessionsQueryTyoe from './schemas/sessions.graphql';
import sessionLoader from './services/sessionLoader';
import { SessionService } from './services/sessionsService';

export const sessionsModule = createModule({
  id: 'sessions-module',
  dirname: __dirname,
  typeDefs: [SessionsQueryTyoe],
  resolvers: resolvers,
  providers: [SessionService, sessionLoader],
});
