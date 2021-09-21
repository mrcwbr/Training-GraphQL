import "graphql-import-node";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import compression from 'compression';
import express from "express";
import depthLimit from 'graphql-depth-limit';
import { createServer } from "http";
import helmet from "helmet";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  validationRules: [depthLimit(7)],
});

app.use(cors());
app.use(helmet());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
httpServer.listen(
  { port: 3000 },
  (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));