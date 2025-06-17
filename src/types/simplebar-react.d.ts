declare module 'simplebar-react' {
  import * as React from 'react';

  export interface SimpleBarProps extends React.HTMLAttributes<HTMLDivElement> {
    scrollableNodeProps?: React.HTMLAttributes<HTMLDivElement>;
    forceVisible?: boolean | 'x' | 'y';
    autoHide?: boolean;
    direction?: 'ltr' | 'rtl';
  }

  declare const SimpleBar: React.FC<SimpleBarProps>;
  export default SimpleBar;
}
