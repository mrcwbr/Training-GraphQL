import { CardContent, Divider, Fab } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { IAttendee } from '../../models/attendee';
import { ISession } from '../../models/session';
import { getSessionsByIds } from '../../services/conferenceApi';
import { getProfileImageUrl } from '../../services/profilePictureApi';
import { AddSessionButtonWrapper, AttendeeAvatar, AttendeeCard, AttendeeHeading, AttendeeSessions, AttendeeSubheader, SessionName, SessionsHeading, SessionsList, SessionsListItem } from '../../styled/Attendee.styled';
import AddSessions from './AddSessions';

const Attendee: React.FC<IAttendee> = (attendee) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [sessions, setSessions] = useState<ISession[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      if (sessions.length === 0 && attendee.sessionIds.length > 0) {
        const sessions = await getSessionsByIds(attendee.sessionIds);
        setSessions(sessions);
      }
    };

    loadSessions();
  }, [sessions.length, attendee]);

  return (
    <AttendeeCard>
      <AddSessionButtonWrapper>
        <Fab color="primary" size="small" aria-label="add" onClick={() => setDialogOpen(true)}>
          <AddBox />
        </Fab>
      </AddSessionButtonWrapper>
      <CardContent>
        <AttendeeAvatar src={getProfileImageUrl(attendee.id)} />
        <AttendeeHeading>
          {attendee.firstName} {attendee.lastName}
        </AttendeeHeading>
        <AttendeeSubheader>{attendee.emailAddress}</AttendeeSubheader>
        <AttendeeSubheader>{attendee.userName}</AttendeeSubheader>
      </CardContent>
      <Divider light />
      <AttendeeSessions display={'flex'} flexDirection={'column'}>
        <SessionsHeading>Sessions</SessionsHeading>
        <SessionsList>
          {sessions.map((m) => (
            <SessionsListItem key={m.id}>
              <SessionName>{m.title}</SessionName>
            </SessionsListItem>
          ))}
        </SessionsList>
      </AttendeeSessions>
      <AddSessions
        isOpen={dialogOpen}
        attendeeId={attendee.id}
        assignedSessionIds={attendee.sessionIds}
        onCompleted={(newSessions) => {
          setDialogOpen(false);
          if (newSessions !== undefined) setSessions(newSessions);
        }}
      />
    </AttendeeCard>
  );
};

export default Attendee;
