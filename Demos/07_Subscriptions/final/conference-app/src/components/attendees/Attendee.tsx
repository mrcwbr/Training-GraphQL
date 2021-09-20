import { useSubscription } from '@apollo/client';
import { CardContent, Divider, Fab } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { useState } from 'react';
import { IAttendeeGraphModel } from '../../graphql/models/attendee';
import { ISessionAttendeeChangedGraphModel, ISessionGraphModel } from '../../graphql/models/session';
import { SESSION_ADDED_TO_ATTENDEE_SUBSCRIPTION } from '../../graphql/subscriptions/sessions';
import { getProfileImageUrl } from '../../services/profilePictureApi';
import { AddSessionButtonWrapper, AttendeeAvatar, AttendeeCard, AttendeeHeading, AttendeeSessions, AttendeeSubheader, SessionName, SessionsHeading, SessionsList, SessionsListItem } from '../../styled/Attendee.styled';
import AddSessions from './AddSessions';

const Attendee: React.FC<IAttendeeGraphModel> = (attendee) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [sessions, setSessions] = useState<ISessionGraphModel[]>(attendee.sessions);

  const { data } = useSubscription<{ sessionAttendeesChanged: ISessionAttendeeChangedGraphModel }>(SESSION_ADDED_TO_ATTENDEE_SUBSCRIPTION);

  if (data !== undefined && data.sessionAttendeesChanged.attendeeId === attendee.id) {
    if (sessions !== undefined && sessions.length !== data.sessionAttendeesChanged.sessions.length) {
      setSessions(data.sessionAttendeesChanged.sessions);
    }
  }

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
          {sessions !== undefined &&
            sessions.map((m) => (
              <SessionsListItem key={m.id}>
                <SessionName>{m.title}</SessionName>
              </SessionsListItem>
            ))}
        </SessionsList>
      </AttendeeSessions>
      <AddSessions
        isOpen={dialogOpen}
        attendeeId={attendee.id}
        assignedSessionIds={attendee.sessions.map((m) => m.id)}
        onCompleted={(newSessions) => {
          setDialogOpen(false);
        }}
      />
    </AttendeeCard>
  );
};

export default Attendee;
