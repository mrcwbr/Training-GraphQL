import 'graphql-import-node';
import dotenv from 'dotenv';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
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
import { ApolloServerPluginUsageReporting } from 'apollo-server-core';
import { PubSub } from 'graphql-subscriptions';
import { verifyAuth0Token } from './auth0';
import axios from 'axios';

dotenv.config({ path: __dirname + '/.env' });

export const pubsub = new PubSub();

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
  context: async ({ req }) => {
    const token = req.headers.authorization || '';

    if (!token) throw new AuthenticationError('You are not authorized.');
    const user = await verifyAuth0Token(token);

    return { user };
  },
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

server.installSubscriptionHandlers(httpServer);

app.use(cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

app.get('/token', async (req, res) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.AUTH0_CLIENTID!);
  params.append('client_secret', process.env.AUTH0_SECRET!);
  params.append('audience', process.env.AUTH0_AUDIENCE!);

  const result = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, params);

  res.send(result.data.access_token);
});

httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
