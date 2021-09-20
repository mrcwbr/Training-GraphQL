import { CardContent, Divider, Fab } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import { useState } from 'react';
import { IAttendeeGraphModel } from '../../graphql/models/attendee';
import { getProfileImageUrl } from '../../services/profilePictureApi';
import { AddSessionButtonWrapper, AttendeeAvatar, AttendeeCard, AttendeeHeading, AttendeeSessions, AttendeeSubheader, SessionName, SessionsHeading, SessionsList, SessionsListItem } from '../../styled/Attendee.styled';
import AddSessions from './AddSessions';

const Attendee: React.FC<IAttendeeGraphModel> = (attendee) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
          {attendee.sessions.map((m) => (
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
