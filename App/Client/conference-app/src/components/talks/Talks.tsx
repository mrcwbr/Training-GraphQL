import { Fab, Tab, Tabs } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ISession } from '../../models/session';
import { getSessions } from '../../services/conferenceApi';
import { AddButtonWrapper } from '../../styled/Common.styled';
import { TalkList, TalkListItem } from '../../styled/Talk.styled';
import AddTalk from './AddTalk';
import Talk from './Talk';

const Talks = () => {
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<ISession[]>([]);
  const [tabIndex, setTabIndex] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadSessions = async () => {
      if (sessions.length === 0) {
        const sessionsList = await getSessions();
        setSessions(sessionsList);

        const sessionDates = sessionsList.map((m) => moment(new Date(m.startTime)).startOf('day'));
        setTabIndex(moment.min(sessionDates).format());
      }
    };

    loadSessions();
  }, [sessions]);

  useEffect(() => {
    if (sessions.length > 0 && tabIndex !== '') {
      setSelectedSessions(sessions.filter((m) => moment(new Date(m.startTime)).startOf('days').format() === tabIndex).sort((a, b) => moment(a.startTime).valueOf() - moment(b.startTime).valueOf()));
    }
  }, [tabIndex, sessions]);

  const getConferenceDays = () => {
    const confDates: string[] = [];

    sessions.forEach((m) => {
      const startOfDay = moment(new Date(m.startTime)).startOf('day').format();
      if (!confDates.includes(startOfDay)) confDates.push(startOfDay);
    });

    return confDates.map((m, i) => {
      const date = moment(m);
      return <Tab key={i} label={date.format('dddd')} disableRipple value={date.format()} />;
    });
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
      <Tabs variant={'fullWidth'} centered value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
        {getConferenceDays()}
      </Tabs>
      <AddButtonWrapper>
        <Fab color="secondary" aria-label="add" onClick={() => setDialogOpen(true)}>
          <Add />
        </Fab>
      </AddButtonWrapper>
      <TalkList>{renderSessions()}</TalkList>;
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
