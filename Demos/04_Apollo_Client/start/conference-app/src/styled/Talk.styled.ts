import { Avatar, Card, CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const TalkCard = styled(Card)`
  position: relative;

  max-width: 300px;
  transition: 0.3s;
  margin: auto;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.3);

  height: 535px;
  max-height: 535px;

  &:hover {
    box-shadow: 0 16px 70px -12.125px rgba(0, 0, 0, 0.3);
  }
`;

export const TalkCardContent = styled(CardContent)`
  text-align: left;
  padding: 24px;
  height: 365px;
  max-height: 365px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 75px 1fr 90px;
`;

export const TalkCardTitleWrapper = styled.div`
  overflow: hidden;
  grid-row: 1;
`;

export const TalkCardTitle = styled(Typography)`
  font-weight: bold;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const TalkCardAbstractWrapper = styled.div`
  overflow: hidden;
  grid-row: 2;
`;

export const TalkCardAbstract = styled(Typography)`
  line-height: 1.8;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const TalkCardAttendeesWrapper = styled.div`
  overflow: hidden;
  grid-row: 3;
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

export const TimeSlotTag = styled.div`
  position: absolute;
  width: fit-content;
  height: 25px;
  background-color: cadetblue;
  border-radius: 10px;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
`;

export const TimeSlot = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  padding: 0px 15px;
`;

export const TalkList = styled.ul``;

export const TalkListItem = styled.li`
  list-style-type: none;
  display: inline-block;

  margin: 10px 30px;
`;