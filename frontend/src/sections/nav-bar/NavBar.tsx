import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Account from './Account';

const NavBar: React.FC = () => {

  return (
    <AppBar position="static" sx={{ height: 64 }}>
      <Toolbar sx={{ minHeight: 64, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4} container justifyContent="center">
            <Typography
              variant="h6"
              component={Link}
              to="/all-photographers"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              לכל הצלמים
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }} container justifyContent="flex-start">
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              עמוד הבית
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="center">
            <Account />
          </Grid>

        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

