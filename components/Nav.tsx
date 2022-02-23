import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  refetchUserQuery,
  useSignOutMutation,
  useUserQuery,
} from '../types/generated-queries';
import CircularProgress from '@mui/material/CircularProgress';

export default function Nav() {
  const user = useUserQuery();

  const [signout] = useSignOutMutation({
    refetchQueries: [refetchUserQuery()],
  });

  if (user.loading) return <CircularProgress />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Typography
            variant="h2"
            component="div"
            sx={{
              flexGrow: 1,
              '& a': {
                textDecoration: 'none',
                color: 'white',
              },
            }}
          >
            <Link href="/">Todo</Link>
          </Typography>
          {user.data?.authenticatedItem && (
            <Button
              color="inherit"
              sx={{
                textDecoration: 'none',

                fontSize: 20,
              }}
              onClick={() => signout()}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
