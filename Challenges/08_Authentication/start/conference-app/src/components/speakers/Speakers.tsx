import { useQuery } from '@apollo/client';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { ISpeakerGraphModel } from '../../graphql/models/speaker';
import { GET_ALL_SPEAKERS } from '../../graphql/queries/speakers';
import { AddButtonWrapper } from '../../styled/Common.styled';
import { SpeakerList, SpeakerListItem } from '../../styled/Speaker.styled';
import Speaker from './Speaker';

export const Speakers = () => {

  const { loading, error, data } = useQuery<{ speakers: ISpeakerGraphModel[] }>(GET_ALL_SPEAKERS);

  if (error) return <>ERROR</>;

  if (loading) return <>LOADING</>;

  if (data === undefined || data.speakers.length === 0) return <>NO ITEMS</>;

  const renderSpeakers = () => {
    return data.speakers.map((speaker) => {
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
