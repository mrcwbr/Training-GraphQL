import { IAttendee } from '../models/attendee';
import { AttendeeService, IAttendeeService } from '../services/attendeeService';

export default {
  Mutation: {
    addAttendee: async (parent: any, { attendee }: any, context: any, info: any): Promise<IAttendee> => {
      console.log(attendee);

      // todo: check attendeObject

      const attendeeSvc: IAttendeeService = context.injector.get(AttendeeService);
      return attendeeSvc.createAttendee({
        emailAddress: attendee.emailAddress,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        userName: attendee.userName,
        sessionIds: attendee.sessionIds,
      });
    },
  },
};
