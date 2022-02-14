import { Button, Container, TextField, Typography } from '@mui/material';
import useForm from '../utils/useForm';
import {
  refetchUserQuery,
  useCreateTodoMutation,
} from '../types/generated-queries';

export default function CreateTodo() {
  const { inputs, handleChange, clearForm } = useForm({
    title: '',
    description: '',
  });

  const [createTodo, { loading, error }] = useCreateTodoMutation({
    variables: {
      title: inputs.title || '',
      description: inputs.description,
    },
    refetchQueries: [refetchUserQuery()],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createTodo();
        clearForm();
      }}
    >
      <Container sx={{ marginTop: 10, marginBottom: 5 }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          sx={{
            color: '#426696',
            fontWeight: 600,
            opacity: 0.8,
          }}
        >
          Create a new Todo
        </Typography>
        <div>
          <TextField
            type="text"
            placeholder="Title"
            sx={{ margin: 1, padding: 1 }}
            label="Title"
            helperText="Enter the Title of the Todo"
            required
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
            helperText="Enter the Description of the Todo if any"
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
          Create
        </Button>
      </Container>
    </form>
  );
}