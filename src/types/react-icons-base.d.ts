declare module 'react-icons' {
  import { ComponentType, SVGProps } from 'react';
  export interface IconBaseProps extends SVGProps<SVGElement> {
    size?: string | number;
    color?: string;
    title?: string;
  }
  export type IconType = ComponentType<IconBaseProps>;
} 