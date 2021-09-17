import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { TalkCard, TalkCardAbstract, TalkCardDivider, TalkCardTitle } from '../../styled/TalkCard.styled';
import Talk from './Talk';

const TalkList = styled.ul``;

const TalkListItem = styled.li`
  list-style-type: none;
  display: inline-block;

  &:not(:first-of-type) {
    margin: 10px 30px;
  }
`;

const Talks = () => {
  return (
    <TalkList>
      <TalkListItem>
        <Talk />
      </TalkListItem>

      <TalkListItem>
        <Talk />
      </TalkListItem>
    </TalkList>
  );
};

export default Talks;
