import React from 'react';

import Link from 'next/link';

type DefaultAnchorProps = JSX.IntrinsicElements["a"];

type DefaultButtonProps = JSX.IntrinsicElements["button"];

export interface ButtonProps extends DefaultButtonProps {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  nested?: boolean;
}

export interface LinkButtonProps extends DefaultAnchorProps {
  href: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  nested?: boolean;
}

export const LinkButton = ({
  href,
  title,
  rightIcon,
  leftIcon,
  nested,
  children,
}: LinkButtonProps): JSX.Element => {
  return (
    <Link passHref href={href}>
      <LinkButtonElement
        href={href}
        title={title}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        nested={nested}
      >
        {children}
      </LinkButtonElement>
    </Link>
  );
};

const LinkButtonElement = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ rightIcon, leftIcon, nested, children, ...props }, ref) => (
    <a ref={ref} {...props}>
      <Button rightIcon={rightIcon} leftIcon={leftIcon} nested={nested}>
        {children}
      </Button>
    </a>
  )
);

export const Button = ({
  rightIcon,
  leftIcon,
  children,
  nested,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`select-none flex hover:bg-background rounded-md cursor-pointer active:scale-95 ${
        nested ? "bg-gray-100" : "bg-secondaryBg"
      }`}
      {...props}
    >
      {leftIcon && (
        <div className="flex py-1 bg-gray-200 rounded-l-md">
          <div className="mx-2 my-auto">{leftIcon}</div>
        </div>
      )}
      <div className="flex px-4 py-2 space-x-2 leading-4">{children}</div>
      {rightIcon && (
        <div className="flex py-2 bg-gray-200 rounded-r-md">
          <div className="mx-2 my-auto">{rightIcon}</div>
        </div>
      )}
    </button>
  );
};
