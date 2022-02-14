import EditTodo from '../components/EditTodo';
import PleaseSignIn from '../components/PleaseSignIn';

export default function EditTodoPage({ query }) {
  return (
    <div>
      <PleaseSignIn>
        <EditTodo id={query.id} />
      </PleaseSignIn>
    </div>
  );
}
