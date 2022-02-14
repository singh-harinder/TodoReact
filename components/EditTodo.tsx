import { Button, Container, TextField, Typography } from '@mui/material';
import Router from 'next/router';
import Head from 'next/head';
import useForm from '../utils/useForm';
import {
  useTodoQuery,
  useUpdateTodoMutation,
} from '../types/generated-queries';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (updateLoading) return <p>Loading ...</p>;
  if (updateError) return <p>Error: {updateError.message}</p>;

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
            sx={{ margin: 1, color: '#426696', fontWeight: 600, opacity: 0.8 }}
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
              color: 'black',
              fontWeight: 800,
              opacity: 0.8,
              borderRadius: 2,
              background: 'linear-gradient(to right top, #65dfc9, #6cdbeb)',
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
