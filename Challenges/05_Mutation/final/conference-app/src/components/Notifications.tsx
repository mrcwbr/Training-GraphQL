import { Snackbar } from '@material-ui/core';
import { useState } from 'react';

const Notifications = () => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(true);

  return <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen} autoHideDuration={6000} message={"Attendee is joined to a session! 😍"} onClose={() => setSnackbarOpen(false)}  />;
};

export default Notifications;
