import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { IAttendee } from '../../models/attendee';
import { getAttendees } from '../../services/conferenceApi';
import { AddButtonWrapper } from '../../styled/Common.styled';
import Attendee from './Attendee';
import { AttendeeList, AttendeeListItem } from '../../styled/Attendee.styled';
import AddAttendee from './AddAttendee';

export const Attendees = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<IAttendee[]>([]);

  // TODO: Implement GraphQL Query to fetch all attendees and attendees sessions here

  useEffect(() => {
    const loadAttendees = async () => {
      if (attendees.length === 0) {
        const attendeesList = await getAttendees();
        setAttendees(attendeesList);
      }
    };

    loadAttendees();
  }, [attendees]);

  const renderAttendees = () => {
    return attendees.map((attendee) => {
      return (
        <AttendeeListItem key={attendee.id}>
          <Attendee {...attendee} />
        </AttendeeListItem>
      );
    });
  };

  return (
    <>
      <AddButtonWrapper>
        <Fab color="secondary" aria-label="add" onClick={() => setDialogOpen(true)}>
          <Add />
        </Fab>
      </AddButtonWrapper>
      <AttendeeList>{renderAttendees()}</AttendeeList>
      <AddAttendee
        isOpen={dialogOpen}
        onCompleted={(attendee) => {
          setDialogOpen(false);
          if (attendee !== undefined) setAttendees([...attendees, attendee]);
        }}
      />
    </>
  );
};

export default Attendees;
