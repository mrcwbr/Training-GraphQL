import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

interface IAddTalkProps {
  isOpen: boolean;
  onCompleted: () => void;
}

const AddTalk: React.FC<IAddTalkProps> = (props) => {
  return (
    <Dialog open={props.isOpen} onClose={props.onCompleted}>
      <DialogTitle>Add a new Talk</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="title" label="Title" type="text" fullWidth variant="outlined" />
        <TextField margin="dense" id="abstract" label="Abstract" type="text" multiline rows={6} fullWidth variant="outlined" />

      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCompleted}>Cancel</Button>
        <Button onClick={props.onCompleted}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTalk;
