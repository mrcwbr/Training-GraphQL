import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import { AddButtonWrapper } from '../../styled/Common.styled';
import Attendee from './Attendee';
import { AttendeeList, AttendeeListItem } from '../../styled/Attendee.styled';
import AddAttendee from './AddAttendee';
import { GET_ALL_ATTENDEES } from '../../graphql/queries/attendees';
import { useQuery } from '@apollo/client';
import { IAttendeeGraphModel } from '../../graphql/models/attendee';

export const Attendees = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { loading, error, data, refetch } = useQuery<{ attendees: IAttendeeGraphModel[] }>(GET_ALL_ATTENDEES);

  if (error) return <>ERROR</>;

  if (loading) return <>LOADING</>;

  if (data === undefined || data.attendees.length === 0) return <>NO ITEMS</>;

  const renderAttendees = () => {
    return data.attendees.map((attendee) => {
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
        onCompleted={async (attendee) => {
          setDialogOpen(false);
          if (attendee !== undefined) await refetch();
        }}
      />
    </>
  );
};

export default Attendees;
