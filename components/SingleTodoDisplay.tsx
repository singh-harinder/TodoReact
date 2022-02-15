import {
  Button,
  CardActions,
  CardHeader,
  Container,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Router from 'next/router';
import {
  refetchUserQuery,
  useDeleteTodoMutation,
  useTodoQuery,
} from '../types/generated-queries';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function update(cache: any, payload: any) {
  cache.evict(cache.identify(payload.data.deleteTodo));
}

export default function SingleTodoDisplay({ id }: { id: string }) {
  const [deleteTodo, { loading: deleteLoading }] = useDeleteTodoMutation({
    variables: {
      id,
    },
    update,
    refetchQueries: [refetchUserQuery()],
  });

  const { data, loading, error } = useTodoQuery({
    variables: {
      id,
    },
  });

  return (
    <Container>
      <Card>
        <CardHeader title={data?.Todo?.title} />
        <CardContent>
          <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
            {data?.Todo?.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', marginBottom: 2 }}>
          <Button
            size="small"
            variant="outlined"
            disabled={loading}
            sx={{
              borderColor: 'black',
            }}
            onClick={() => {
              Router.push({
                pathname: '/edittodo',
                query: {
                  id: data?.Todo?.id,
                },
              });
            }}
          >
            <EditIcon sx={{ color: 'black' }} />
          </Button>
          <Button
            sx={{ float: 'right', borderColor: 'black' }}
            size="small"
            disabled={loading}
            variant="outlined"
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to delete this Todo?')
              ) {
                await deleteTodo();
                Router.push({
                  pathname: '/',
                });
              }
            }}
          >
            <DeleteIcon sx={{ color: 'black' }} />
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
