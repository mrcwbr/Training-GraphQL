import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const UserPicture = styled.img`
  width: 60px;
  height: 60px;
  transition: '0.3s';
  border-radius: 100%;
  align-self: center;
`;

const UserProfile = styled.div`
  padding: 16px;
  transition: '0.3s';
  display: flex;
  flex-direction: column;
`;

const NavHeaderEx = () => {
  const { user } = useAuth0();

  if (user === undefined) return <></>;

  return (
    <>
      <UserProfile>
        {/*  <Avatar
          style={{
            width: 60,
            height: 60,
            transition: '0.3s',
          }}
        /> */}
        <UserPicture src={user.picture} title="userPicture" alt="userPictures" />
        <div style={{ paddingBottom: 16 }} />
        <Typography variant={'h6'} noWrap>
          {user.name}
        </Typography>
        <Typography color={'textSecondary'} noWrap gutterBottom>
          {user.email}
        </Typography>
      </UserProfile>
      <Divider />
    </>
  );
};

export default NavHeaderEx;
