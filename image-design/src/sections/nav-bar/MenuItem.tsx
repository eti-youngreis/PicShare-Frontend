import React from 'react';
import { MenuItem as MuiMenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

const MenuItem: React.FC = () => {
  return (
    <>
      <MuiMenuItem component={Link} to={`${PATHS.Home}/${PATHS.MyGallery}`}>
        <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>התמונות שלי</Typography>
      </MuiMenuItem>
    </>
  );
};

export default MenuItem;
