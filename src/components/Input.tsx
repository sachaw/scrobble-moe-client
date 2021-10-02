import React from 'react';

import { FiClipboard } from 'react-icons/fi';

type DefaulInputProps = JSX.IntrinsicElements["input"];

export interface InputProps extends DefaulInputProps {}

export const Input = ({ ...props }: InputProps): JSX.Element => {
  return (
    <div className="w-full flex rounded-md border border-gray-200 hover:border-gray-400 ">
      <input
        className="h-10 w-full bg-transparent px-3 py-2 focus:outline-none focus:border-pink-400"
        {...props}
      />
      <div className="flex hover:bg-gray-200 rounded-r-md cursor-pointer text-gray-600 hover:text-foreground">
        <div className="my-auto px-2 ">
          <FiClipboard />
        </div>
      </div>
    </div>
  );
};
