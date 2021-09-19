import { ApolloError, UserInputError } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';
import { IAttendeeApi } from '../data/attendeeData';
import { ISessionApi } from '../data/sessionData';
import { IAttendee, ISession } from '../models';
import { IAttendeeMutationError } from '../models/attendee';
import { SessionAttendeeOperation } from '../models/common';
import { pubsub } from '../server';

export default {
  Query: {
    attendees: (parent, args, context, info: GraphQLResolveInfo): Promise<IAttendee[]> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.allAttendees();
    },
    attendee: async (parent, args, context, info: GraphQLResolveInfo): Promise<IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;

      if (args.attendeeId === undefined || args.attendeeId < 1) throw new UserInputError("attendeeId param isn't valid", { attendeeId: args.attendeeId });

      try {
        return await attendeeApi.attendeeById(args.attendeeId);
      } catch (e) {
        throw new ApolloError(`Can't find Attendee with id '${args.attendeeId}'`, 'API_ERROR');
      }
    },
  },
  Mutation: {
    createAttendee: (parent, args, context, info: GraphQLResolveInfo): Promise<IAttendeeMutationError | IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.createAttendee(args.request);
    },
    deleteAttendee: (parent, args, context, info: GraphQLResolveInfo): Promise<Boolean> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.deleteAttendee(args.attendeeId);
    },
    attendee: (parent, { attendeeId }) => AttendeeOperations(attendeeId),
  },
  Attendee: {
    sessions: (parent: IAttendee, args, context, info): Promise<ISession[]> => {
      const sessionApi: ISessionApi = context.dataSources.sessionApi;
      return sessionApi.sessionByIds(parent.sessionIds);
    },
  },
  CreateAttendeeResponse: {
    __resolveType(obj: IAttendeeMutationError | IAttendee, context, info: GraphQLResolveInfo) {
      if (obj.hasOwnProperty('errorMessage')) {
        return 'AttendeeMutationError';
      }

      if (obj.hasOwnProperty('id')) {
        return 'Attendee';
      }
      return null;
    },
  },
};

const AttendeeOperations = (attendeeId: number) => ({
  addSession: async (args, context, info: GraphQLResolveInfo) => {
    const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
    const attendee = await attendeeApi.addAttendeeToSession(attendeeId, args.sessionId);

    pubsub.publish('ATTENDEE_SESSION_ADDED', {
      sessionAttendeesChanged: {
        sessionId: args.sessionId,
        attendee: attendee,
        operation: SessionAttendeeOperation.Add,
      },
    });

    return true;
  },
  delete: (args, context, info: GraphQLResolveInfo) => {
    const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
    return attendeeApi.deleteAttendee(attendeeId);
  },
});
