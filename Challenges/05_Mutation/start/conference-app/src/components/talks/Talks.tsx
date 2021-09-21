import { useQuery } from '@apollo/client';
import { Fab, Tab, Tabs } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import moment from 'moment';
import { useState } from 'react';
import { ISessionGraphModel } from '../../graphql/models/session';
import { GET_ALL_SESSION_QUERY } from '../../graphql/queries/sessions';
import { AddButtonWrapper } from '../../styled/Common.styled';
import { TalkList, TalkListItem } from '../../styled/Talk.styled';
import AddTalk from './AddTalk';
import Talk from './Talk';

const Talks = () => {
  const [selectedSessions, setSelectedSessions] = useState<ISessionGraphModel[]>([]);
  const [tabIndex, setTabIndex] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { loading, error, data } = useQuery<{ sessions: ISessionGraphModel[] }>(GET_ALL_SESSION_QUERY);

  if (error) return <>ERROR</>;

  if (loading) return <>LOADING</>;

  if (data === undefined || data.sessions.length === 0) return <>NO ITEMS</>;

  const getConferenceDays = () => {
    const confDates: string[] = [];

    const sortedSessions = [...data.sessions].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    sortedSessions.forEach((m) => {
      const startOfDay = moment(new Date(m.startTime)).startOf('days').format();
      if (!confDates.includes(startOfDay)) confDates.push(startOfDay);
    });

    return confDates.map((m, i) => {
      const date = moment(m);

      if (i === 0 && tabIndex === '') {
        setTabIndex(date.format());
        setSelectedSessions(data.sessions.filter((m) => moment(new Date(m.startTime)).startOf('days').format() === date.format()).sort((a, b) => moment(a.startTime).valueOf() - moment(b.startTime).valueOf()));
      }

      return <Tab key={i} label={date.format('dddd')} disableRipple value={date.format()} />;
    });
  };

  const onTabChanged = (value: string) => {
    if (value !== '') {
      setTabIndex(value);
      setSelectedSessions(data.sessions.filter((m) => moment(new Date(m.startTime)).startOf('days').format() === tabIndex).sort((a, b) => moment(a.startTime).valueOf() - moment(b.startTime).valueOf()));
    }
  };

  const renderSessions = () => {
    return selectedSessions.map((session) => {
      return (
        <TalkListItem key={session.id}>
          <Talk {...session} />
        </TalkListItem>
      );
    });
  };

  return (
    <>
      <Tabs variant={'fullWidth'} centered value={tabIndex} onChange={(e, val) => onTabChanged(val)}>
        {getConferenceDays()}
      </Tabs>
      <AddButtonWrapper>
        <Fab color="secondary" aria-label="add" onClick={() => setDialogOpen(true)}>
          <Add />
        </Fab>
      </AddButtonWrapper>
      <TalkList>{renderSessions()}</TalkList>
      <AddTalk
        isOpen={dialogOpen}
        onCompleted={() => {
          setDialogOpen(false);
        }}
      />
    </>
  );
};

export default Talks;
