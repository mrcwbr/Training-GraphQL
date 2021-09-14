import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import compression from 'compression';
import express from "express";
import depthLimit from 'graphql-depth-limit';
import { createServer } from "http";
import { schema } from "./schema";
import helmet from "helmet";

const app = express();
const server = new ApolloServer({
  schema: schema,
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