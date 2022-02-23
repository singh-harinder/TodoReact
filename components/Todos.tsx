import Grid from '@mui/material/Grid';
import { Alert, Container, Typography } from '@mui/material';
import Todo from './Todo';
import { useUserQuery } from '../types/generated-queries';
import SignIn from './SignIn';
import CircularProgress from '@mui/material/CircularProgress';

export default function Todos() {
  const me = useUserQuery();

  const { data, loading, error } = useUserQuery();

  if (me.loading) return <CircularProgress />;

  if (!me.data?.authenticatedItem) return <SignIn />;

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <Container>
      <Typography
        variant="h4"
        color="primary"
        sx={{
          fontWeight: 600,
          marginBottom: 2,
        }}
      >
        {data?.authenticatedItem?.name} Todos
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
