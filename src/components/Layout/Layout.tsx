import React from 'react';
import { Root, Main } from './Layout.styled';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Root>
      <Main>{children}</Main>
    </Root>
  );
}
