import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-full transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'gap-2 py-2 px-3 md:py-3 md:px-5 bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 text-[18px] md:text-[20px] font-medium leading-[20px] capitalize',
        secondary: 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 focus:ring-white',
        outline: 'bg-white text-secondary-500 hover:bg-primary-500 hover:text-white focus:ring-secondary-500 text-[14px] md:text-[18px] font-medium leading-[16px] md:leading-[20px] capitalize border-[1.5px] border-secondary-500/30 h-[32px] md:h-[46px] font-poppins',
        activeButton: 'py-2 px-3 md:py-3 md:px-4 bg-white text-secondary-500 hover:bg-secondary-50 focus:ring-secondary-500 text-[20px] md:text-[24px] font-medium leading-[20px] md:leading-[24px] capitalize border border-secondary-500',
      },
      size: {
        sm: 'text-sm px-4 py-2',
        md: 'text-base px-6 py-2.5',
        lg: 'text-lg px-3 md:px-8 py-3',
      },
      withIcon: {
        true: 'group',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      withIcon: false,
    },
  }
);

type IconPosition = 'front' | 'back';

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const IconWrapper = ({ icon, position }: { icon: ReactNode; position: IconPosition }) => (
  <span 
    className={cn(
      "inline-flex items-center transition-transform duration-200 group-hover:translate-x-1",
      position === 'front' ? 'mr-2 group-hover:-translate-x-1' : 'ml-2'
    )}
  >
    {icon}
  </span>
);

export const Button = ({
  className,
  variant,
  size,
  icon,
  iconPosition = 'back',
  href,
  children,
  ...props
}: ButtonProps) => {
  const classes = cn(buttonVariants({ variant, size, withIcon: !!icon, className }));
  const content = (
    <>
      {icon && iconPosition === 'front' && <IconWrapper icon={icon} position="front" />}
      {children}
      {icon && iconPosition === 'back' && <IconWrapper icon={icon} position="back" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};

export default Button;
