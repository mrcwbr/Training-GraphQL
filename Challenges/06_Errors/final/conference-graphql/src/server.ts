import 'graphql-import-node';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import SessionData from './data/sessionData';
import SpeakerData from './data/speakerData';
import dbConfig from './dbConfig';
import AttendeeData from './data/attendeeData';

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  introspection: true,
  playground: true,
  dataSources: () => {
    return {
      speakerDb: new SpeakerData(dbConfig),
      sessionApi: new SessionData(),
      attendeeApi: new AttendeeData(),
    };
  },
  validationRules: [depthLimit(7)],
  plugins: [
    ApolloServerPluginUsageReporting({
      sendVariableValues: { all: true },
      sendHeaders: { all: true },
      generateClientInfo: ({ request }) => {
        const headers = request.http && request.http.headers;
        if (headers) {
          return {
            clientName: headers['apollographql-client-name'],
            clientVersion: headers['apollographql-client-version'],
            userAgent: headers['user-agent'],
          };
        } else {
          return {
            clientName: 'Unknown Client',
            clientVersion: 'Unversioned',
            userAgent: 'Unkown userAgent',
          };
        }
      },
    }),
  ],
});

app.use(cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
httpServer.listen({ port: 3000 }, (): void => console.log(`\nš      GraphQL is now running on http://localhost:3000/graphql`));
function ApolloServerPluginUsageReporting(arg0: { sendVariableValues: { all: boolean; }; sendHeaders: { all: boolean; }; generateClientInfo: ({ request }: { request: any; }) => { clientName: any; clientVersion: any; userAgent: any; }; }): import("apollo-server-core").PluginDefinition {
  throw new Error('Function not implemented.');
}

