import { cn } from '../../lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={cn('mx-auto w-full max-w-[1240px] px-4 md:px-6', className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
