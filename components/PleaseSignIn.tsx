import { useUser } from './User';
import SignIn from './SignIn';
import { ReactNode } from 'react';

interface PleaseSignInProps {
  children: ReactNode;
}

export default function PleaseSignIn({ children }: PleaseSignInProps) {
  const me = useUser();

  if (!me) return <SignIn />;
  return children;
}
