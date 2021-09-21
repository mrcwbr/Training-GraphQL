import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { useState } from 'react';
import { IAttendee, ICreateAttendeeRequest } from '../../models/attendee';
import { addAttendee } from '../../services/conferenceApi';

interface IAddAttendeeProps {
  isOpen: boolean;
  onCompleted: (attendee?: IAttendee) => void;
}

const AddAttendee: React.FC<IAddAttendeeProps> = (props) => {
  const [formData, updateFormData] = useState<ICreateAttendeeRequest>({
    emailAddress: '',
    firstName: '',
    lastName: '',
    userName: '',
  });

  const handleChange = (e: any) => {
    updateFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  return (
    <form
      id="add-attendee-form"
      onSubmit={async (e: any) => {
        e.preventDefault();
        if (formData.emailAddress !== '' && formData.firstName !== '' && formData.lastName !== '' && formData.userName !== '') {
          const attendee = await addAttendee(formData);
          props.onCompleted(attendee);
        }
      }}
    >
      <Dialog open={props.isOpen} onClose={() => props.onCompleted()}>
        <DialogTitle>Register a new attendee</DialogTitle>
        <DialogContent>
          <DialogContentText>You can register a new attendee for the NDC London 2019 here</DialogContentText>

          <TextField autoFocus margin="dense" id="firstName" label="Firstname" type="text" required fullWidth variant="outlined" onChange={handleChange} />
          <TextField margin="dense" id="lastName" label="LastName" type="text" required fullWidth variant="outlined" onChange={handleChange} />

          <TextField margin="dense" id="emailAddress" label="EMail" type="email" required fullWidth variant="outlined" onChange={handleChange} />
          <TextField margin="dense" id="userName" label="Username" type="text" required fullWidth variant="outlined" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onCompleted()}>Cancel</Button>
          <Button type="submit" form="add-attendee-form">
            Register Attendee
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddAttendee;
