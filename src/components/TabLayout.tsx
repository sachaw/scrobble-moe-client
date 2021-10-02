import React from "react";

type DefaulDivProps = JSX.IntrinsicElements["div"];

export interface TabLayoutProps extends DefaulDivProps {
  actions: JSX.Element;
}

export const TabLayout = ({
  actions,
  children,
}: TabLayoutProps): JSX.Element => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex mb-4 ml-auto mr-4 -mt-4 space-x-2 md:mr-0">
        {actions}
      </div>
      {children}
    </div>
  );
};
