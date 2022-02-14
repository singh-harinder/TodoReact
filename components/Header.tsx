import { ReactNode } from 'react';
import Nav from './Nav';
import Head from 'next/head';

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div>
      <Head>
        <title>Todo</title>
      </Head>
      <Nav />
      {children}
    </div>
  );
}
