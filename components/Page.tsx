import { Box } from '@mui/system';
import Todos from './Todos';
import { ReactNode } from 'react';
import CreateTodo from './CreateTodo';
import { Container } from '@mui/material';

interface PageProps {
  children?: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <Container
      sx={{
        background:
          'linear-gradient(to right bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.3))',
        borderRadius: 8,
        zIndex: 2,
      }}
    >
      <Box />
      <Todos />
      <div>{}</div>
      <Box />
      <CreateTodo />
      <Box />
      {children}
    </Container>
  );
}
