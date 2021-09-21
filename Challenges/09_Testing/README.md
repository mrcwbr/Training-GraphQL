yarn add faker @types/faker

https://moonhighway.com/mocking-apollo-server

https://medium.com/@jdeflaux/graphql-integration-tests-with-apollo-server-testing-jest-mongodb-and-nock-af5a82e95954

# Apollo

yarn add faker
yarn add - D @types/faker

## pubSub.ts

```
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
```

## attendeResolvers.ts & sessionResolvers.ts

Update Ref zu pubsub

## mocks.ts

```
import { MockList } from 'apollo-server-express';
import faker from 'faker/locale/de';

export default {
  Query: () => ({
    attendees: () => new MockList([2, 20]),
  }),
  Attendee: () => ({
    id: () => faker.datatype.number({ min: 0, max: 89 }),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    userName: () => faker.internet.userName(),
    emailAddress: () => faker.internet.email(),
  }),
};
```

## server.ts

Remove pubsub

```
import mocks from './mocks';

const server = new ApolloServer({
  // ...
  mocks: mocks,
  // ...
});
```

yarn add ts-jest jest jest-transform-graphql
yarn add -D @types/jest

## jest.config.json

```
{
  "roots": [
    "<rootDir>/tests"
  ],
  "transform": {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "/tests/.*.spec.(js|ts|tsx)?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
```

Create tests folder

## tests/attendees.spec.ts

```
import 'graphql-import-node';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import mocks from '../src/mocks';
import resolvers from '../src/resolvers';
import typeDefs from '../src/typeDefs';
import SpeakerData from '../src/data/speakerData';
import SessionData from '../src/data/sessionData';
import AttendeeData from '../src/data/attendeeData';
import dbConfig from '../src/dbConfig';

let apolloServer: ApolloServer | undefined;

beforeAll(() => {
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  const server = new ApolloServer({
    schema: executableSchema,
    dataSources: () => {
      return {
        speakerDb: new SpeakerData(dbConfig),
        sessionApi: new SessionData(),
        attendeeApi: new AttendeeData(),
      };
    },
    //mocks: mocks,
  });

  apolloServer = server;
});

export const GET_ALL_ATTENDEES = gql`
  query GetAllAttendees {
    attendees {
      id
      firstName
      lastName
      emailAddress
      userName
    }
  }
`;

test('Get_All_Attendess_Should_No_Be_Empty', async () => {
  if (apolloServer === undefined) throw new Error('Apollo Server is missing');

  const result = await apolloServer.executeOperation({
    query: GET_ALL_ATTENDEES,
  });
  expect(result.errors).toBeUndefined();
  expect(result.data).toBeDefined();
  expect(result.data?.attendees.length).toBeGreaterThanOrEqual(2);
  expect(result.data?.attendees[0].firstName).toBeDefined();
});
```

## package.json

```
  "scripts": {
    // ...
    "test": "jest --runInBand --config jest.config.json"
  },
```
