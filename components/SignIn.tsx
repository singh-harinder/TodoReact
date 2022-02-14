import { Button, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Router from 'next/router';
import useForm from '../utils/useForm';
import { SyntheticEvent } from 'react';
import {
  refetchUserQuery,
  useSignInMutation,
} from '../types/generated-queries';

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useSignInMutation({
    variables: {
      email: inputs.email || '',
      password: inputs.password || '',
    },
    refetchQueries: [refetchUserQuery()],
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const res = await signin();
    resetForm();
    Router.push({
      pathname: '/',
    });
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Container>
      <form method="POST" onSubmit={handleSubmit}>
        <Container>
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{
              margin: 1,
              fontWeight: 600,
            }}
          >
            Sign in to your Account
          </Typography>
          <div>
            {error && (
              <Typography variant="h5" sx={{ color: 'red', marginLeft: 2 }}>
                {error.message}
              </Typography>
            )}
          </div>
          <div>
            <TextField
              label="Email"
              helperText="Enter your Email Address"
              required
              fullWidth
              name="email"
              sx={{ margin: 1, padding: 1 }}
              id="email"
              type="email"
              autoComplete="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label="Password"
              helperText="Enter your Password."
              required
              name="password"
              fullWidth
              sx={{ margin: 1, padding: 1 }}
              type="password"
              id="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <Button
            sx={{
              marginLeft: 2,
              marginTop: 1,
              padding: 2,
              fontWeight: 800,
              borderRadius: 2,
            }}
            type="submit"
            disabled={loading}
            variant="contained"
          >
            Sign In
          </Button>
        </Container>
        <Container>
          <div>
            <Typography sx={{ marginLeft: 1, marginTop: 1, padding: 1 }}>
              Don&apos;t have an account? Sign Up for one below
            </Typography>
            <Link href="/signup" passHref>
              <Button
                variant="contained"
                type="button"
                disabled={loading}
                sx={{
                  marginLeft: 2,
                  marginTop: 1,
                  padding: 2,
                  fontWeight: 800,
                  borderRadius: 2,
                }}
              >
                Create an Account
              </Button>
            </Link>
          </div>
        </Container>
      </form>
    </Container>
  );
}
