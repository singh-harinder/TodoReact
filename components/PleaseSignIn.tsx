import { useUserQuery } from '../types/generated-queries';
import SignIn from './SignIn';

interface PleaseSignInProps {
  children: JSX.Element;
}

export default function PleaseSignIn({ children }: PleaseSignInProps) {
  const me = useUserQuery();

  if (!me.data?.authenticatedItem) return <SignIn />;
  return children;
}
