**attendeeResolvers.ts**


```typescript
export default {
  Query: {
    //...
    attendee: async (parent, args, context, info): Promise<IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      if (args.attendeeId === undefined || args.attendeeId < 1) 
        throw new UserInputError("attendeeId param isn't valid", { attendeeId: args.attendeeId });

      try {
        return await attendeeApi.attendeeById(args.attendeeId);
      } catch (e) {
        throw new ApolloError(`Can't find Attendee with id '${args.attendeeId}'`, 'API_ERROR');
      }
    },
  },
  // ...
}
```