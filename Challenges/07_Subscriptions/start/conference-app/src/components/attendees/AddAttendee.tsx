import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { useState } from 'react';
import { IAttendeeGraphModel, ICreateAttendeeGraphRequest } from '../../graphql/models/attendee';
import { CREATE_ATTENDEE } from '../../graphql/mutations/attendee';
import { ICreateAttendeeRequest } from '../../models/attendee';

interface IAddAttendeeProps {
  isOpen: boolean;
  onCompleted: (attendee?: IAttendeeGraphModel) => void;
}

const AddAttendee: React.FC<IAddAttendeeProps> = (props) => {
  const [formData, updateFormData] = useState<ICreateAttendeeRequest>({
    emailAddress: '',
    firstName: '',
    lastName: '',
    userName: '',
  });

  const [createAttendee] = useMutation<IAttendeeGraphModel>(CREATE_ATTENDEE, {
    onCompleted: (data) => {
      props.onCompleted(data);
    },
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
          await createAttendee({
            variables: {
              attendee: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailAddress: formData.emailAddress,
                userName: formData.userName,
                sessionIds: [],
              } as ICreateAttendeeGraphRequest,
            },
          });
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
