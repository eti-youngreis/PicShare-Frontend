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
import { getCurrentUser } from '../services/user.service';
import { setSession } from '../auth/utils';
import { setUser } from '../redux/auth/auth.slice';
import { signin } from '../services/auth.service'
import { useDispatch } from 'react-redux';
export default function SignIn() {
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    general: ''
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const validate = (data: FormData) => {
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };
    let isValidData = true;

    const email = data.get('email')?.toString() || '';
    const password = data.get('password')?.toString() || '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!email) {
      newErrors.email = 'נדרש להזין אימייל';
      isValidData = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'נא להזין כתובת אימייל תקינה';
      isValidData = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'נדרש להזין סיסמה';
      isValidData = false;
    }

    setErrors(newErrors);
    return isValidData
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Clear all previous errors
    setErrors({ email: '', password: '', general: '' });

    if (validate(data)) {
      setIsLoading(true);
      try {
        // 1. Sign in and get token
        const token = await signin(data.get('email')!.toString(), data.get('password')!.toString());
        
        // 2. Save token to session (required for subsequent requests)
        setSession(token);
        
        // 3. Get user details (request will use saved token)
        const user = await getCurrentUser();
        
        // 4. Store user data in Redux
        dispatch(setUser(user));
        
        // 5. Reset form on success
        event.currentTarget.reset();
      } catch (error: any) {
        const serverError = error.response?.data;
        
        // Handle specific error cases
        if (serverError?.code === 'INVALID_CREDENTIALS') {
          setErrors(prev => ({ ...prev, general: 'אימייל או סיסמה שגויים' }));
        } else if (serverError?.code === 'USER_NOT_FOUND') {
          setErrors(prev => ({ ...prev, general: 'לא נמצא משתמש עם אימייל זה' }));
        } else if (serverError?.code === 'ACCOUNT_LOCKED') {
          setErrors(prev => ({ ...prev, general: 'החשבון נעול. נא ליצור קשר עם התמיכה' }));
        } else {
          setErrors(prev => ({ ...prev, general: 'אירעה שגיאה. נא לנסות שוב מאוחר יותר' }));
        }
      } finally {
        setIsLoading(false);
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
          התחברות
        </Typography>
        {errors.general && (
          <Typography variant="body1" color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {errors.general}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="אימייל"
            name="email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            error={!!errors.password}
            helperText={errors.password}
            disabled={isLoading}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'מתחבר...' : 'התחבר'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                שכחת סיסמה?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"אין לך חשבון? הירשם עכשיו"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
