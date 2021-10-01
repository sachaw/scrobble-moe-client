import React from 'react';

import { Tab } from '@headlessui/react';

type DefaulDivProps = JSX.IntrinsicElements["div"];

export interface CardProps extends DefaulDivProps {
  title: string;
  tabs?: {
    title: string;
    component: () => JSX.Element;
  }[];
  controlls?: () => JSX.Element;
}

export const Card = ({
  title,
  tabs,
  controlls,
  children,
  className,
  ...props
}: CardProps): JSX.Element => {
  return (
    <div
      {...props}
      className={`rounded-xl border relative border-gray-200 bg-secondaryBg ${className}`}
    >
      <div className={`p-8 pb-4 ${tabs ? "" : "border-b"}`}>
        <h1 className="text-xl">{title}</h1>
      </div>
      <div className="absolute right-4 top-4">{controlls}</div>

      {tabs && (
        <Tab.Group>
          <Tab.List className="flex w-full border-b space-x-8 px-8">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }): string =>
                  `${
                    selected
                      ? "border-foreground"
                      : "border-secondaryBg text-gray-500 hover:text-foreground"
                  } border-b-2 pb-2  cursor-pointer`
                }
              >
                {tab.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab, index) => (
              <Tab.Panel key={index} className="m-8">
                <tab.component />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}

      <div className="m-8">{children}</div>
    </div>
  );
};
