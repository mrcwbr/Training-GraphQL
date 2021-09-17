import { Avatar, Box, Card } from '@material-ui/core';
import styled from 'styled-components';

export const SpeakerCard = styled(Card)`
  border-radius: 12;
  text-align: center;
  width: 350px;

  box-shadow: 0 2px 4px -2px rgb(0 0 0 / 24%), 0 4px 24px -2px rgb(0 0 0 / 20%);
`;

export const SpeakerAvatar = styled(Avatar)`
  width: 60;
  height: 60;
  margin: auto;
`;

export const SpeakerHeading = styled.h3`
  font-size: 18;
  font-weight: bold;
  letter-spacing: 0.5px;
  margin-top: 8;
  margin-bottom: 0;
`;

export const SpeakerSubheader = styled.span`
  font-size: 14;
  color: #9e9e9e;
  margin-bottom: '0.875em';
`;

export const SpeakerCountLabel = styled.p`
  font-size: 12;
  color: #9e9e9e;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  margin: 0;
`;

export const SpeakerCountValue = styled.p`
  font-size: 20;
  font-weight: bold;
  margin-bottom: 4;
  letter-spacing: 1px;
`;
