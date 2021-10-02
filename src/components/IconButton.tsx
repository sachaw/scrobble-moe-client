import React from 'react';

type DefaulButtonProps = JSX.IntrinsicElements["button"];

export interface IconButtonProps extends DefaulButtonProps {
  icon: React.ReactNode;
}

export const IconButton = ({
  icon,
  ...props
}: IconButtonProps): JSX.Element => {
  return (
    <div className="my-auto">
      <button
        type="button"
        className="p-2 rounded-md bg-gray-100 hover:bg-background active:scale-95"
        {...props}
      >
        {icon}
        <span className="sr-only">Refresh</span>
      </button>
    </div>
  );
};
