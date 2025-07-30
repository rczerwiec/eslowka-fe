/// <reference types="react/jsx-runtime" />

import { ReactElement, ReactNode } from 'react';

declare global {
  namespace JSX {
    interface Element extends ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): JSX.Element;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
  }
} 