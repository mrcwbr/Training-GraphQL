import { Box, CardContent, Divider } from '@material-ui/core';
import { SpeakerAvatar, SpeakerCard, SpeakerCountLabel, SpeakerCountValue, SpeakerHeading, SpeakerSubheader } from '../../styled/Speaker.styled';

export const Speaker = () => {
  return (
    <SpeakerCard>
      <CardContent>
        <SpeakerAvatar src={'https://i.pravatar.cc/400'} />
        <SpeakerHeading>Alan Podemski</SpeakerHeading>
        <SpeakerSubheader>Poland</SpeakerSubheader>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'}>
          <SpeakerCountLabel>Followers</SpeakerCountLabel>
          <SpeakerCountValue>6941</SpeakerCountValue>
        </Box>
        <Box p={2} flex={'auto'}>
          <SpeakerCountLabel>Following</SpeakerCountLabel>
          <SpeakerCountValue>12</SpeakerCountValue>
        </Box>
      </Box>
    </SpeakerCard>
  );
};

export default Speaker;
