import 'graphql-import-node';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';

const app = express();
const server = new ApolloServer({});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
