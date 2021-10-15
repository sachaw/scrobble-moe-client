import React from 'react';

type DefaultInputProps = JSX.IntrinsicElements["input"];

interface InputProps extends DefaultInputProps {
  title: string;
  error?: string;
  action?: JSX.Element;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ title, error, action, ...props }, ref) => (
    <div>
      <label className="text-xs font-semibold text-gray-600">
        {title}
        {error && <span className="ml-2 text-red-500">{error}</span>}
      </label>
      <div
        className={`flex w-full border-y md:border md:rounded-md ${
          error
            ? "border-red-500"
            : "border-gray-200 focus-within:border-gray-400 hover:border-gray-400"
        }`}
      >
        <input
          ref={ref}
          className="w-full h-10 px-3 py-2 bg-transparent focus:outline-none focus:border-pink-400"
          {...props}
        />
        {action && <div className="flex mr-1">{action}</div>}
        {/* {typeof action === "function" && (
          <div
            className="flex text-gray-600 cursor-pointer hover:bg-gray-200 rounded-r-md hover:text-foreground"
            onClick={onCopy}
          >
            <div className="px-2 my-auto ">
              <FiClipboard />
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
);
