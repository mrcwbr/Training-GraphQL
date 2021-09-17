import { Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { EmojiPeople, Mic, People } from '@material-ui/icons';

const NavMenu = () => {
  return (
    <List>
      <ListItem key={'Talks'} selected={true} button onClick={() => alert('huhu')}>
        <ListItemIcon>
          <Icon>
            <Mic />
          </Icon>
        </ListItemIcon>
        <ListItemText primary={'Talks'} primaryTypographyProps={{ noWrap: true }} />
      </ListItem>

      <ListItem key={'Speakers'} selected={false} button onClick={() => alert('huhu')}>
        <ListItemIcon>
          <Icon>
            <People />
          </Icon>
        </ListItemIcon>
        <ListItemText primary={'Speakers'} primaryTypographyProps={{ noWrap: true }} />
      </ListItem>

      <ListItem key={'Attendees'} selected={false} button onClick={() => alert('huhu')}>
        <ListItemIcon>
          <Icon>
            <EmojiPeople />
          </Icon>
        </ListItemIcon>
        <ListItemText primary={'Attendees'} primaryTypographyProps={{ noWrap: true }} />
      </ListItem>
    </List>
  );
};

export default NavMenu;
