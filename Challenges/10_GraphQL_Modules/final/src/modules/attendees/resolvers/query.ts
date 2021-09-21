import { IAttendee } from '../models/attendee';
import { AttendeeService, IAttendeeService } from '../services/attendeeService';

export default {
  Query: {
    attendees: async (parent: any, args: any, context: any, info: any): Promise<IAttendee[]> => {
      const attendeeSvc: IAttendeeService = context.injector.get(AttendeeService);
      return attendeeSvc.allAttendees();
    },
    attendee: async (parent: any, args: any, context: any, info: any): Promise<IAttendee> => {
      const attendeeSvc: IAttendeeService = context.injector.get(AttendeeService);
      return attendeeSvc.attendeeById(args.attendeeId);
    },
  },
};
