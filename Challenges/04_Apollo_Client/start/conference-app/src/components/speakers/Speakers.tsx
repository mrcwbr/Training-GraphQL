import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { ISpeaker } from '../../models/speaker';
import { getSpeakers } from '../../services/conferenceApi';
import { AddButtonWrapper } from '../../styled/Common.styled';
import { SpeakerList, SpeakerListItem } from '../../styled/Speaker.styled';
import Speaker from './Speaker';

export const Speakers = () => {
  const [speakers, setSpeakers] = useState<ISpeaker[]>([]);

  // TODO: Implement GraphQL Query to fetch all speakers here

  useEffect(() => {
    const loadSpeakers = async () => {
      if (speakers.length === 0) {
        const speakersList = await getSpeakers();
        setSpeakers(speakersList);
      }
    };

    loadSpeakers();
  }, [speakers]);

  const renderSpeakers = () => {
    return speakers.map((speaker) => {
      return (
        <SpeakerListItem key={speaker.id}>
          <Speaker {...speaker} />
        </SpeakerListItem>
      );
    });
  };

  return (
    <>
      <AddButtonWrapper>
        <Fab color="secondary" aria-label="add">
          <Add />
        </Fab>
      </AddButtonWrapper>
      <SpeakerList>{renderSpeakers()}</SpeakerList>
    </>
  );
};

export default Speakers;
