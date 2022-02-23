import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import Router from 'next/router';
import Head from 'next/head';
import useForm from '../utils/useForm';
import {
  useTodoQuery,
  useUpdateTodoMutation,
} from '../types/generated-queries';
import CircularProgress from '@mui/material/CircularProgress';

export default function EditTodo({ id }: { id: string }) {
  const { data, loading, error } = useTodoQuery({
    variables: {
      id,
    },
  });

  const { inputs, handleChange, clearForm } = useForm({
    title: data?.Todo?.title || '',
    description: data?.Todo?.description || '',
  });

  const [updateTodo, { error: updateError, loading: updateLoading }] =
    useUpdateTodoMutation({
      variables: {
        id,
        title: inputs.title,
        description: inputs.description,
      },
    });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  if (updateLoading) return <CircularProgress />;
  if (updateError) {
    return <Alert severity="error">Error: {updateError.message}</Alert>;
  }

  return (
    <>
      <Head>
        <title>Todo | {data?.Todo?.title}</title>
      </Head>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await updateTodo();
          clearForm();
          Router.push({
            pathname: '/',
          });
        }}
      >
        <Container sx={{ marginTop: 10, marginBottom: 5 }}>
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{ margin: 1, fontWeight: 600 }}
          >
            Update Todo
          </Typography>
          <div>
            <TextField
              type="text"
              placeholder="Title"
              sx={{ margin: 1, padding: 1 }}
              label="Title"
              helperText="Update the Title of the Todo"
              name="title"
              id="title"
              fullWidth
              value={inputs.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              type="text"
              multiline
              placeholder="Description"
              sx={{ margin: 1, padding: 1 }}
              label="Description"
              helperText="Update the Description of the Todo if any"
              name="description"
              id="description"
              fullWidth
              value={inputs.description}
              onChange={handleChange}
            />
          </div>
          <Button
            sx={{
              marginTop: 1,
              marginLeft: 2,
              padding: 2,
              fontWeight: 800,
              borderRadius: 2,
            }}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Update
          </Button>
        </Container>
      </form>
    </>
  );
}
