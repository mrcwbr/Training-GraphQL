import { Badge, Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { EmojiPeople, Mic, People } from '@material-ui/icons';
import { useHistory, withRouter } from 'react-router-dom';

const NavMenu = () => {
  const history = useHistory();

  const isSelected = (linkPath: string) => history.location.pathname === linkPath;

  return (
    <List>
      <ListItem key={'Talks'} selected={isSelected('/talks')} button onClick={() => history.push('/talks')}>
        <ListItemIcon>
          <Icon>
            <Mic />
          </Icon>
        </ListItemIcon>
        <ListItemText primary={'Talks'} primaryTypographyProps={{ noWrap: true }} />
      </ListItem>

      <ListItem key={'Speakers'} selected={isSelected('/speakers')} button onClick={() => history.push('/speakers')}>
        <ListItemIcon>
          <Icon>
            <People />
          </Icon>
        </ListItemIcon>
        <ListItemText primary={'Speakers'} primaryTypographyProps={{ noWrap: true }} />
      </ListItem>

      <ListItem key={'Attendees'} selected={isSelected('/attendees')} button onClick={() => history.push('/attendees')}>
        <ListItemIcon>
          <Badge badgeContent={4} color="secondary">
            <Icon>
              <EmojiPeople />
            </Icon>
          </Badge>
        </ListItemIcon>
        <ListItemText primary={'Attendees'} primaryTypographyProps={{ noWrap: true }} />
      </ListItem>
    </List>
  );
};

export default withRouter(NavMenu);
