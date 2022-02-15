import SingleTodoDisplay from '../../components/SingleTodoDisplay';

type SingleTodoDisplayProps = {
  query: {
    id: string;
  };
};

export default function TodoPage({ query }: SingleTodoDisplayProps) {
  return <SingleTodoDisplay id={query.id} />;
}
