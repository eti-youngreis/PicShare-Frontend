import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { addUser } from '../services/user.service'
import { FullUserType } from '../types/user.types';
import { signin } from '../services/auth.service'
import { setSession } from '../auth/utils';
import { setUser } from '../redux/auth/auth.slice';

export default function SignUp() {
  const [errors, setErrors] = React.useState({
    fullName: '',
    email: '',
    password: '',
  })

  const validate = (data: FormData) => {
    console.log('validate')
    let isValidData = true;
    const temp = { ...errors }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test((data.get('email') || "").toString());
    if (!data.get('email') || data.get('email')!.toString() === '' || !isValid) {
      isValidData = false
      temp.email = "Email is not valid"
    }
    else
      temp.email = ''
    if (!data.get('password') || data.get('password')!.toString() === '' || data.get('password')!.toString().length < 6) {
      isValidData = false
      temp.password = 'Password is not valid, enter at least 6 characters'
    }
    else
      temp.password = ''
    if (!data.get('fullName') || data.get('fullName')!.toString() === '') {
      isValidData = false
      temp.fullName = 'Name is required'
    }
    else
      temp.fullName = ''
    setErrors(temp)
    return isValidData
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (validate(data)) {
      event.currentTarget.reset();
      const newUser: FullUserType = {
        fullName: data.get('fullName')!.toString(),
        email: data.get('email')!.toString(),
        password: data.get('password')!.toString()
      }
      const res = await addUser(newUser)
      if (res) {
        const token = await signin(data.get('email')!.toString(), data.get('password')!.toString())
        setSession(token)
        setUser({ id: res, fullName: data.get('fullName')!.toString() })
      }
      else {
          setErrors({...errors, email:'Email already exists, please sign in'})
      }
    }    
  };

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
        {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>} */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                fullWidth
                id="fullName"
                label="Full Name"
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
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors.password}
                autoComplete="new-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
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
              <Link href="signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}