import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import { UserSignUpType } from '../types/user.types';
import { PATHS } from '../routes/paths';
import { signup } from '../services/auth.service';

export default function SignUp() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [redirect, setRedirect] = React.useState(false);

  const validate = () => {
    let isValidData = true;
    const temp = { ...errors };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailPattern.test(formData.email)) {
      isValidData = false;
      temp.email = "Email is not valid";
    } else {
      temp.email = '';
    }

    if (!formData.password || formData.password.length < 6) {
      isValidData = false;
      temp.password = 'Password is not valid, enter at least 6 characters';
    } else {
      temp.password = '';
    }

    if (!formData.fullName) {
      isValidData = false;
      temp.fullName = 'Name is required';
    } else {
      temp.fullName = '';
    }

    setErrors(temp);
    return isValidData;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (validate()) {
      try {
        const userData: UserSignUpType = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        };
        
        await signup(userData);
        setRedirect(true);
      } catch (error: any) {
        if (error.response?.status === 500) {
          console.error('Server error:', error.response.message);
        }
        setErrors(prev => ({ 
          ...prev, 
          email: error.response?.data || 'An error occurred during sign up' 
        }));
      }
    }
  };

  if (redirect) {
    return <Navigate to={PATHS.SignIn} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                fullWidth
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={PATHS.SignIn} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}