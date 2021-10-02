import React from 'react';

type DefaulDivProps = JSX.IntrinsicElements["div"];

export interface ButtonProps extends DefaulDivProps {
  rightIcon?: React.ReactNode;
  nested?: boolean;
}

export const Button = ({
  rightIcon,
  children,
  nested,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <div
      className={`flex hover:bg-background rounded-md cursor-pointer active:scale-95 ${
        nested ? "bg-gray-100" : "bg-secondaryBg"
      }`}
      {...props}
    >
      <div className="flex px-4 py-2 space-x-2 leading-4">{children}</div>
      {rightIcon && (
        <div className="flex bg-gray-200 rounded-r-md">
          <div className="my-auto mx-2">{rightIcon}</div>
        </div>
      )}
    </div>
  );
};
