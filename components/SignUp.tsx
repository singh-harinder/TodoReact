import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';
import useForm from '../utils/useForm';
import useFormValidate from '../utils/useFormValidate';
import { SyntheticEvent } from 'react';
import { useSignUpMutation } from '../types/generated-queries';

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, error, loading }] = useSignUpMutation({
    variables: {
      name: inputs.name || '',
      email: inputs.email || '',
      password: inputs.password || '',
    },
  });

  const { formError, setFormError, handleError } = useFormValidate();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setFormError(false);
    if (handleError(inputs)) {
      return;
    }

    const res = await signup().catch(console.error);
    resetForm();
  }

  return (
    <Container sx={{ width: '50%' }}>
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        sx={{
          fontWeight: 600,
        }}
      >
        Sign Up for a new Account
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        {data?.createUser && (
          <>
            <Typography variant="h4" gutterBottom color="primary">
              Account creation successful!
              <Link href="/signin" passHref>
                <Button sx={{ margin: 1, padding: 1 }} variant="contained">
                  Click Here
                </Button>
              </Link>
              to Log In
            </Typography>
          </>
        )}
        <div>
          <TextField
            label="Name"
            fullWidth
            type="text"
            helperText="Enter your Name"
            variant="outlined"
            name="name"
            id="name"
            required
            sx={{ marginTop: 2, marginBottom: 2 }}
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            label="Email"
            type="email"
            helperText="Enter your Email"
            name="email"
            fullWidth
            id="email"
            sx={{ marginTop: 2, marginBottom: 2 }}
            autoComplete="email"
            variant="outlined"
            required
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            label="Password."
            variant="outlined"
            helperText="Password must be more than 8 characters long"
            fullWidth
            type="password"
            error={formError}
            sx={{ marginTop: 2, marginBottom: 2 }}
            autoComplete="password"
            name="password"
            id="password"
            required
            value={inputs.password}
            onChange={handleChange}
          />
        </div>

        <Button
          sx={{
            marginTop: 1,
            padding: 2,
            fontWeight: 800,
            borderRadius: 2,
          }}
          type="submit"
          disabled={loading}
          variant="contained"
        >
          Create an Account
        </Button>
      </form>
    </Container>
  );
}
