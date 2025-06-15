import React from 'react';
import type { LayoutProps } from './Layout.types';
import { Root, Main } from './Layout.styled';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Root>
      <Main>{children}</Main>
    </Root>
  );
};

export default Layout;
