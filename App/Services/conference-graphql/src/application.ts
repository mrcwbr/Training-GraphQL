import { createApplication } from 'graphql-modules';
import { attendeeModule } from './modules/attendees/attendeeModule';
import { sessionsModule } from './modules/sessions/sessionsModule';
import { speakersModule } from './modules/speakers/speakersModule';

const application = createApplication({
  modules: [speakersModule, sessionsModule, attendeeModule],
});

export default application;
