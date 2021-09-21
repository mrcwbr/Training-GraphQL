import { IAttendee, ISession } from '../models';

export default {
  Query: {
    attendees: (parent, args, context, info): IAttendee[] => {
      return [
        {
          id: 1,
          firstName: 'Peter',
          lastName: 'Pan',
          emailAddress: 'peter.pan@hello.de',
          userName: 'peter.pan',
        },
      ];
    },
    attendee: (parent, args, context, info): IAttendee => {
      return {
        id: args.attendeeId,
        firstName: 'Peter',
        lastName: 'Pan',
        emailAddress: 'peter.pan@hello.de',
        userName: 'peter.pan',
      };
    },
  },
};
