// declaration.d.ts
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;
  export default ReactComponent;
}

/// <reference types="vite/client" />
