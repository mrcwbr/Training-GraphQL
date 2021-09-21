import { Box, CardContent, Divider } from '@material-ui/core';
import { ISpeakerGraphModel } from '../../graphql/models/speaker';
import { getProfileImageUrl } from '../../services/profilePictureApi';
import { SpeakerAvatar, SpeakerCard, SpeakerCountLabel, SpeakerCountValue, SpeakerHeading, SpeakerSubheader } from '../../styled/Speaker.styled';

export const Speaker: React.FC<ISpeakerGraphModel> = (speaker) => {
  return (
    <SpeakerCard>
      <CardContent>
        <SpeakerAvatar src={getProfileImageUrl(speaker.id)} />
        <SpeakerHeading>{speaker.name}</SpeakerHeading>
        <SpeakerSubheader>{speaker.webSite}</SpeakerSubheader>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'}>
          <SpeakerCountLabel>Sessions</SpeakerCountLabel>
          <SpeakerCountValue>{speaker.sessions.length}</SpeakerCountValue>
        </Box>
        <Box p={2} flex={'auto'}>
          <SpeakerCountLabel>Attendees</SpeakerCountLabel>
          <SpeakerCountValue>0</SpeakerCountValue>
        </Box>
      </Box>
    </SpeakerCard>
  );
};

export default Speaker;
