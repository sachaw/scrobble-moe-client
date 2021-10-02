import React from 'react';

type DefaulDivProps = JSX.IntrinsicElements["div"];

export interface SelectableCardProps extends DefaulDivProps {
  status?: "success" | "warn" | "fail" | "running" | "pening";
}

export const SelectableCard = ({
  status,
  children,
  className,
  ...props
}: SelectableCardProps): JSX.Element => {
  return (
    <div
      {...props}
      className={`md:rounded-xl hover:border-gray-200 border-gray-100 border bg-gray-100 ${className}`}
    >
      <div className="flex my-2 mx-4 space-x-4">
        {status && (
          <div
            className={`my-auto w-3 h-3 min-w-[0.75rem] rounded-full ${
              status === "success"
                ? "bg-green-500"
                : status === "warn"
                ? "bg-yellow-500"
                : status === "fail"
                ? "bg-red-500"
                : status === "running"
                ? "bg-blue-500"
                : "bg-gray-500"
            }`}
          ></div>
        )}
        {children}
      </div>
    </div>
  );
};
