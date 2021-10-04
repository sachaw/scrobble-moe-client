import React from 'react';

import ReactTimeago from 'react-timeago';

type DefaulDivProps = JSX.IntrinsicElements["div"];

export interface SelectableCardProps extends DefaulDivProps {
  status?: "success" | "warn" | "fail" | "running" | "pening";
  updatedAt?: string;
  actions?: JSX.Element;
}

export const SelectableCard = ({
  status,
  updatedAt,
  actions,
  children,
  className,
  ...props
}: SelectableCardProps): JSX.Element => {
  return (
    <div
      {...props}
      className={`md:rounded-xl hover:border-gray-200 border-gray-100 border bg-gray-100 ${className}`}
    >
      <div className="flex mx-4 my-2 space-x-4">
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
        {updatedAt && (
          <small className="my-auto text-xs font-medium text-gray-600 select-none whitespace-nowrap">
            <ReactTimeago date={updatedAt} />
          </small>
        )}
        {actions}
      </div>
    </div>
  );
};
