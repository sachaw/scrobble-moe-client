import React from 'react';

type DefaulDivProps = JSX.IntrinsicElements["div"];

export interface ButtonProps extends DefaulDivProps {
  type?: "primary" | "secondary";
  rightIcon?: React.ReactNode;
}

export const Button = ({
  type,
  rightIcon,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <div
      className="flex bg-secondaryBg hover:bg-background rounded-md cursor-pointer active:scale-95"
      {...props}
    >
      <div className="flex px-4 py-2 space-x-2">{children}</div>
      {rightIcon && (
        <div className="flex bg-gray-200 rounded-r-md">
          <div className="my-auto mx-2">{rightIcon}</div>
        </div>
      )}
    </div>
  );
};
