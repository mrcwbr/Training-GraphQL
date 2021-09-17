import styled from 'styled-components';
import Speaker from './Speaker';

const SpeakerList = styled.ul``;

const SpeakerListItem = styled.li`
  list-style-type: none;
  display: inline-block;

  &:not(:first-of-type) {
    margin: 10px 30px;
  }
`;

export const Speakers = () => {
  return (
    <SpeakerList>
      <SpeakerListItem>
        <Speaker />
      </SpeakerListItem>

      <SpeakerListItem>
        <Speaker />
      </SpeakerListItem>


      <SpeakerListItem>
        <Speaker />
      </SpeakerListItem>
    </SpeakerList>
  );
};

export default Speakers;
