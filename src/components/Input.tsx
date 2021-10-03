import React from 'react';

import { FiClipboard } from 'react-icons/fi';

type DefaulInputProps = JSX.IntrinsicElements["input"];

export const Input = ({ ...props }: DefaulInputProps): JSX.Element => {
  return (
    <div className="flex w-full border border-gray-200 rounded-md hover:border-gray-400 ">
      <input
        className="w-full h-10 px-3 py-2 bg-transparent focus:outline-none focus:border-pink-400"
        {...props}
      />
      <div className="flex text-gray-600 cursor-pointer hover:bg-gray-200 rounded-r-md hover:text-foreground">
        <div className="px-2 my-auto ">
          <FiClipboard />
        </div>
      </div>
    </div>
  );
};
