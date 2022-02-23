import { useUserQuery } from '../types/generated-queries';
import SignIn from './SignIn';
import CircularProgress from '@mui/material/CircularProgress';

interface PleaseSignInProps {
  children: JSX.Element;
}

export default function PleaseSignIn({ children }: PleaseSignInProps) {
  const me = useUserQuery();

  if (me.loading) return <CircularProgress />;

  if (!me.data?.authenticatedItem) return <SignIn />;
  return children;
}
