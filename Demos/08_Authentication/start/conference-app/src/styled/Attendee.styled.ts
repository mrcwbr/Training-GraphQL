import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { AddButtonWrapper } from './Common.styled';
import { SpeakerAvatar, SpeakerCard, SpeakerHeading, SpeakerSubheader } from './Speaker.styled';

export const AttendeeList = styled.ul``;

export const AttendeeListItem = styled.li`
  list-style-type: none;
  display: inline-block;
  margin: 10px 30px;
`;

export const AttendeeCard = styled(SpeakerCard)`
  position: relative;
`;

export const AddSessionButtonWrapper = styled(AddButtonWrapper)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: none;

  ${AttendeeCard}:hover & {
    display: block;
  }
`;

export const AttendeeAvatar = styled(SpeakerAvatar)``;
export const AttendeeHeading = styled(SpeakerHeading)``;
export const AttendeeSubheader = styled(SpeakerSubheader)`
  display: block;
`;

export const AttendeeSessions = styled(Box)`
  height: 200px;
  max-height: 200px;
  overflow-y: auto;
`;

export const SessionsHeading = styled(AttendeeHeading)`
  margin: 8px 0 6px 0;
`;

export const SessionsList = styled.ul`
  padding-inline-start: 40px;
  padding-inline-end: 40px;
`;

export const SessionsListItem = styled.li`
  list-style-type: square;
  text-align: left;
`;

export const SessionName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  max-width: 300px;
  overflow: hidden;
`;
