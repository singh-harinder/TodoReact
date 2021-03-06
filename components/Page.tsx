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
