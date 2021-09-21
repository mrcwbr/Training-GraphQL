import attendee from './attendee';
import query from './query';
import speaker from './speaker';

export default {
  ...query,
  ...speaker,
  ...attendee
};
