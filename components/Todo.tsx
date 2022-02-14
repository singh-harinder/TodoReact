import {
  Button,
  CardActions,
  CardHeader,
  Container,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ApolloCache, Cache } from '@apollo/client';
import Router from 'next/router';
import {
  refetchUserQuery,
  Todo,
  useDeleteTodoMutation,
  // Todo as todoType,
} from '../types/generated-queries';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type UpdateFnPayloadProps = {
  data: {
    deleteTodo: Todo;
  };
};

function update(cache: ApolloCache<any>, payload: UpdateFnPayloadProps) {
  cache.evict(cache.identify(payload.data.deleteTodo) as Cache.EvictOptions);
}

type TodoProps = {
  todo: Todo;
};

export default function SingleTodo({ todo }: TodoProps) {
  const [deleteTodo, { loading, data, error }] = useDeleteTodoMutation({
    variables: {
      id: todo.id,
    },
    update,
    refetchQueries: [refetchUserQuery()],
  });

  return (
    <Container>
      <Card
        sx={{
          borderRadius: '5%',
        }}
      >
        <CardHeader title={todo.title} />
        <CardContent>
          <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
            {todo?.description}
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
                  id: todo.id,
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
