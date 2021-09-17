import { Avatar, Card, CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const TalkCard = styled(Card)`
  max-width: 300px;
  transition: 0.3s;
  margin: auto;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 16px 70px -12.125px rgba(0, 0, 0, 0.3);
  }
`;

export const TalkCardContent = styled(CardContent)`
  text-align: left;
  padding: 24px;
`;

export const TalkCardTitle = styled(Typography)`
  font-weight: bold;
`;

export const TalkCardAbstract = styled(Typography)`
  line-height: 1.8;
`;

export const TalkCardDivider = styled(Divider)`
  margin: 24px 0;
`;

export const TalkAttendee = styled(Avatar)`
  display: inline-block;
  border: 2px solid white;

  &:not(:first-of-type) {
    margin-left: -8px;
  }
`;

export const TalkCardImage = styled(CardMedia)`
  padding-top: 56.25%;
`;
