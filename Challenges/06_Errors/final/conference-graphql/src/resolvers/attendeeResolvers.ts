import { ApolloError, UserInputError } from 'apollo-server-express';
import { IAttendeeApi } from '../data/attendeeData';
import { ISessionApi } from '../data/sessionData';
import { IAttendee, ISession } from '../models';
import { IAttendeeMutationError } from '../models/attendee';

export default {
  Query: {
    attendees: (parent, args, context, info): Promise<IAttendee[]> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.allAttendees();
    },
    attendee: async (parent, args, context, info): Promise<IAttendee> => {
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
    createAttendee: (parent, args, context, info): Promise<IAttendeeMutationError | IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.createAttendee(args.request);
    },
    deleteAttendee: (parent, args, context, info): Promise<IAttendeeMutationError | Boolean> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.deleteAttendee(args.attendeeId);
    },
    attendeeAddSessions: (parent, args, context, info): Promise<IAttendeeMutationError | IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.addSessions(args.request.attendeeId, args.request.sessionIds);
    },
  },
  Attendee: {
    sessions: (parent, args, context, info): Promise<ISession[]> => {
      const sessionApi: ISessionApi = context.dataSources.sessionApi;
      return sessionApi.sessionsByIds(parent.sessionIds);
    },
  },
  AttendeeMutationOperation: {
    Create: 1,
    Delete: 2,
    AddSession: 3,
  },
  AttendeeMutationResponse: {
    __resolveType(obj: IAttendeeMutationError | IAttendee, context, info) {
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
