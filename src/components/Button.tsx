import React from 'react';

export interface ButtonProps {
  text: string;
}

export const Button = ({ text }: ButtonProps): JSX.Element => {
  return (
    <div className="flex w-20 h-8 bg-secondaryBg hover:bg-background rounded-md cursor-pointer  active:scale-95">
      <div className="m-auto">{text}</div>
    </div>
  );
};
