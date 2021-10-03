import React from 'react';

import { FiLoader } from 'react-icons/fi';

import { Tab } from '@headlessui/react';

type DefaulDivProps = JSX.IntrinsicElements["div"];

export interface CardProps extends DefaulDivProps {
  title: string;
  tabs?: {
    title: string;
    component: () => JSX.Element;
  }[];
}

export const Card = ({
  title,
  tabs,
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
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      {tabs && (
        <Tab.Group as="div">
          <Tab.List className="flex w-full px-8 space-x-8 border-b">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }): string =>
                  `border-b-2 pb-2 cursor-pointer ${
                    selected
                      ? "border-foreground"
                      : "border-secondaryBg text-gray-500 hover:text-foreground"
                  }`
                }
              >
                {tab.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="h-[32rem]">
            {tabs.map((tab, index) => (
              <Tab.Panel key={index} className="h-full my-8 md:m-8 md:pb-8">
                <tab.component />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}

      {children && <div className="my-8 md:m-8 h-[32rem]">{children}</div>}
    </div>
  );
};

export const CardLoading = (): JSX.Element => {
  return (
    <div className="flex w-full h-full rounded-lg bg-background animate-pulse">
      <FiLoader className="m-auto text-4xl animate-spin" />
    </div>
  );
};

export interface CardNoInfoProps {
  message: string;
}

export const CardNoInfo = ({ message }: CardNoInfoProps): JSX.Element => {
  return (
    <div className="flex w-full h-full rounded-lg bg-background">
      <div className="m-auto text-4xl font-semibold">{message}</div>
    </div>
  );
};
