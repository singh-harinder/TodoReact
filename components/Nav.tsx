import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUser } from './User';
import {
  refetchUserQuery,
  useSignOutMutation,
} from '../types/generated-queries';

export default function Nav() {
  const user = useUser();

  const [signout] = useSignOutMutation({
    refetchQueries: [refetchUserQuery()],
  });

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
          {user && (
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
