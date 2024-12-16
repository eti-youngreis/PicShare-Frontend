
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getUser } from '../services/user.service';
import { setSession } from '../auth/utils';
import { setUser } from '../redux/auth/auth.slice';
import { signin } from '../services/auth.service'
export default function SignIn() {
  const [errors, setErrors] = React.useState({
    error: ''
  })
  const validate = (data: FormData) => {
    console.log('validate')
    let isValidData = true
    const temp = { ...errors }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailPattern.test((data.get('email') || "").toString())
    if (!data.get('email') || data.get('email')!.toString() === '' || !isValid || !data.get('password') || data.get('password')!.toString() === '') {
      isValidData = false
      temp.error = "אימייל / סיסמה לא תקין"
    }
    setErrors(temp)
    return isValidData
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (validate(data)) {
      event.currentTarget.reset();
      await signin(data.get('email')!.toString(), data.get('password')!.toString()).then(async (result: any) => {
        setSession(result)
        setUser(await getUser(result))
      }).catch((error: any) => {
        if (error.response && error.response.status === 500) {
          console.log(error.response.message)
        }
        else {
        }
        setErrors({ ...errors, error: error })
      })
    }
    else {
    }
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
          Sign in
        </Typography>
        {errors.error && (
          <Typography variant="body1" color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {errors.error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}