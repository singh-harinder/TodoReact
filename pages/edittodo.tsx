import EditTodo from '../components/EditTodo';
import PleaseSignIn from '../components/PleaseSignIn';

export default function EditTodoPage({ query }: any) {
  return (
    <div>
      <PleaseSignIn>
        <EditTodo id={query.id} />
      </PleaseSignIn>
    </div>
  );
}
