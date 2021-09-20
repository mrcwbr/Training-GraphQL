setup apollo studio
dotenv
add ApolloServerPluginUsageReporting
Headers
apolloError
UserInputError
client format errors

```
APOLLO_KEY=service:conference-graphql:gv2tyiNI5XEyKybtYWXskw
APOLLO_GRAPH_ID=conference-graphql
APOLLO_GRAPH_VARIANT=current
APOLLO_SCHEMA_REPORTING=true
```

```
import dotenv from 'dotenv';
 ...

 dotenv.config({ path: __dirname + '/.env' });

...

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
```


```

attendee: async (parent, args, context, info: GraphQLResolveInfo): Promise<IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;

      if (args.attendeeId === undefined || args.attendeeId < 1) throw new UserInputError("attendeeId param isn't valid", { attendeeId: args.attendeeId });

      try {
        return await attendeeApi.attendeeById(args.attendeeId);
      } catch (e) {
        throw new ApolloError(`Can't find Attendee with id '${args.attendeeId}'`, 'API_ERROR');
      }
    },
```