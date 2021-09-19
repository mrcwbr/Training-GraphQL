import { MockList } from 'apollo-server-express';
import faker from 'faker/locale/de';

export default {
  Query: () => ({
    attendees: () => new MockList([1, 20]),
  }),
  Attendee: () => ({
    id: () => faker.datatype.number({ min: 0, max: 89 }),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    userName: () => faker.internet.userName(),
    emailAddress: () => faker.internet.email(),
  }),
};
