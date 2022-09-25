import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { authActions, selectError } from '../../app/auth.slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const authError = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const onCreateUser: SubmitHandler<FormData> = (data) => {
    dispatch(authActions.createUser(data));
  };

  const onSignIn: SubmitHandler<FormData> = (data) => {
    dispatch(authActions.signIn(data));
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card elevation={4} sx={{ width: 400, borderRadius: 3 }}>
        <Box padding={3}>
          <Typography variant="h5">Login</Typography>
          <Typography variant="body1" color="gray">
            Please sign-in or create a new user
          </Typography>
        </Box>

        <Divider />

        <Box marginTop={2} sx={{ padding: '8px 18px 24px 18px' }}>
          <Stack spacing={2}>
            {authError && (
              <Typography variant="body2" color="error">
                {authError}
              </Typography>
            )}

            <form>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username && 'Username is required'}
                    sx={{ marginBottom: 2 }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password && 'Password is required'}
                  />
                )}
              />
            </form>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
            <Button variant="contained" onClick={handleSubmit(onSignIn)}>
              Sign in
            </Button>

            <Button variant="outlined" onClick={handleSubmit(onCreateUser)}>
              Create user
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
