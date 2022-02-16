import { useUser } from './User';
import SignIn from './SignIn';

interface PleaseSignInProps {
  children: JSX.Element;
}

export default function PleaseSignIn({ children }: PleaseSignInProps) {
  const me = useUser();

  // console.log(me);

  // if (!me) return <SignIn />;
  // return children;
  if (me || undefined) return children;
  return <SignIn />;
}
