import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const NavHeaderEx = () => {
  return (
    <>
      <div style={{ padding: 16, transition: '0.3s' }}>
        <Avatar
          style={{
            width: 60,
            height: 60,
            transition: '0.3s',
          }}
        />
        <div style={{ paddingBottom: 16 }} />
        <Typography variant={'h6'} noWrap>
          Mui Treasury
        </Typography>
        <Typography color={'textSecondary'} noWrap gutterBottom>
          muitreasury@ui.com
        </Typography>
      </div>
      <Divider />
    </>
  );
};

export default NavHeaderEx;
