import { IAttendeeApi } from '../data/attendeeData';
import { ISessionApi } from '../data/sessionData';
import { IAttendee, ISession } from '../models';

export default {
  Query: {
    attendees: (parent, args, context, info): Promise<IAttendee[]> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.allAttendees();
    },
    attendee: (parent, args, context, info): Promise<IAttendee> => {
      const attendeeApi: IAttendeeApi = context.dataSources.attendeeApi;
      return attendeeApi.attendeeById(args.attendeeId);
    },
  },
  Attendee: {
    sessions: (parent, args, context, info): Promise<ISession[]> => {
      const sessionApi: ISessionApi = context.dataSources.sessionApi;
      return sessionApi.sessionsByIds(parent.sessionIds);
    },
  },
};
