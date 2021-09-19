import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem, Select } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import React from 'react';
import { useEffect, useState } from 'react';
import { ISession } from '../../models/session';
import { addSessions, getSessions } from '../../services/conferenceApi';
import { TalkCardDivider } from '../../styled/Talk.styled';

interface IAddSessionsProps {
  isOpen: boolean;
  attendeeId: number;
  assignedSessionIds: number[];
  onCompleted: (sessions?: ISession[]) => void;
}

const AddSessions: React.FC<IAddSessionsProps> = (props) => {
  const [allSessions, setAllSessions] = useState<ISession[]>([]);
  const [assignedSessions, setAssignedSessions] = useState<ISession[]>([]);
  const [availableSessions, setAvailableSessions] = useState<ISession[]>([]);

  useEffect(() => {
    const loadAllSessions = async () => {
      if (allSessions.length === 0) {
        const sessions = await getSessions();
        setAllSessions(sessions);
        setAssignedSessions(sessions.filter((m) => props.assignedSessionIds.includes(m.id)));
        setAvailableSessions(sessions.filter((m) => !props.assignedSessionIds.includes(m.id)).sort((m) => m.id));
      }
    };

    loadAllSessions();
  }, [allSessions.length, props.assignedSessionIds]);

  const getSessionSelectItems = () => {
    const menuItems = availableSessions.map((session) => (
      <MenuItem key={session.id} value={session.id}>
        {session.title}
      </MenuItem>
    ));

    return [
      <MenuItem key={0} value={0}>
        Please select ...
      </MenuItem>,
      ...menuItems,
    ];
  };

  const getSelectedSessionItem = () => {
    return assignedSessions.map((m) => (
      <ListItem key={m.id}>
        <ListItemText primary={m.title} />
        {!props.assignedSessionIds.includes(m.id) && (
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => handleRemoveSession(m.id)}>
              <DeleteOutlined />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    ));
  };

  const handleRemoveSession = (sessionId: number) => {
    const sessionToRemove = allSessions.find((m) => m.id === sessionId);
    const newAssignedSessions = assignedSessions.filter((m) => m.id !== sessionId);

    if (sessionToRemove !== undefined) {
      setAssignedSessions(newAssignedSessions);
      setAvailableSessions([...availableSessions, sessionToRemove].sort((m) => m.id));
    }
  };

  const handleSessionSelect = (e: any) => {
    const sessionId = e.target.value as number;
    const session = allSessions.find((m) => m.id === sessionId);

    if (session !== undefined) {
      const newAssignedSessions = [...assignedSessions, session];
      setAssignedSessions(newAssignedSessions);
      setAvailableSessions(allSessions.filter((m) => !newAssignedSessions.find((n) => n.id === m.id)).sort((m) => m.id));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newSessionIds = assignedSessions.filter((m) => !props.assignedSessionIds.includes(m.id)).map((m) => m.id);
    await addSessions(props.attendeeId, newSessionIds);

    props.onCompleted(assignedSessions);
  };

  return (
    <form id={`add-sessions-${props.attendeeId}-form`} onSubmit={handleSubmit}>
      <Dialog open={props.isOpen} fullWidth onClose={() => props.onCompleted()}>
        <DialogTitle>Assign Attendee to Sessions</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="sessions-label">Sessions</InputLabel>
            <Select labelId="sessions-label" value={0} id="sessions" label="Sessions" onChange={handleSessionSelect}>
              {getSessionSelectItems()}
            </Select>
          </FormControl>
          <TalkCardDivider light />
          <DialogContentText>Assigned Sessions:</DialogContentText>
          <List dense>{getSelectedSessionItem()}</List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onCompleted()}>Cancel</Button>
          <Button type="submit" form={`add-sessions-${props.attendeeId}-form`}>
            Assign to Sessions
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddSessions;
