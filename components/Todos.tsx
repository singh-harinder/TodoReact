import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Todo from './Todo';
import { useUserQuery } from '../types/generated-queries';

export default function Todos() {
  const { data, loading, error } = useUserQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          marginBottom: 2,
        }}
      >
        Todos
      </Typography>
      <Grid container>
        {data?.authenticatedItem?.todos.map((todo) => (
          <Grid
            item
            md={3}
            xs={12}
            sm={6}
            key={todo.id}
            sx={{ marginBottom: 2 }}
          >
            <Todo todo={todo} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
