import React from 'react';

import { FiClipboard } from 'react-icons/fi';

type DefaultInputProps = JSX.IntrinsicElements["input"];

interface InputProps extends DefaultInputProps {
  onCopy?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ onCopy, ...props }, ref) => (
    // export const Input = ({ ...props }: DefaultInputProps): JSX.Element => {
    //   return (
    <div className="flex w-full border border-gray-200 rounded-md hover:border-gray-400 ">
      <input
        ref={ref}
        className="w-full h-10 px-3 py-2 bg-transparent focus:outline-none focus:border-pink-400"
        {...props}
      />
      {typeof onCopy === "function" && (
        <div
          className="flex text-gray-600 cursor-pointer hover:bg-gray-200 rounded-r-md hover:text-foreground"
          onClick={onCopy}
        >
          <div className="px-2 my-auto ">
            <FiClipboard />
          </div>
        </div>
      )}
    </div>
  )
);
