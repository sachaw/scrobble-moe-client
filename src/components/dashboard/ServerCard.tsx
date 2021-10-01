import React from 'react';

import { IServer } from 'graphql/queries/servers';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

import { Disclosure } from '@headlessui/react';

import { Button } from '../Button';

export interface ServerCardProps {
  server: IServer;
}

export const ServerCard = ({ server }: ServerCardProps): JSX.Element => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`w-full bg-gray-100 rounded-lg p-4 select-none hover:border-gray-200 border ${
              open ? "border-gray-200" : "border-gray-100"
            }`}
          >
            <div className="flex space-x-4 w-full justify-between">
              <div className="flex space-x-2">
                <Image src="/plex.svg" width="45" height="45" />
                <div className="flex flex-col">
                  <div className="mr-auto text-lg">{server.name}</div>
                  <div className="mr-auto text-sm font-light text-gray-600 truncate w-32">
                    {server.uuid}
                  </div>
                </div>
              </div>

              <FiArrowRight
                className={`my-auto text-xl ${
                  open ? "transform rotate-90" : ""
                }`}
              />
            </div>
            <Disclosure.Panel className="pt-4">
              <div className="float-right flex space-x-2">
                <Button text="Action" />
                <Button text="Delete" />
              </div>
              <div></div>
            </Disclosure.Panel>
          </Disclosure.Button>
        </>
      )}
    </Disclosure>
  );
};

{
  /* <Input
                w="16rem"
                value={`https://webhook.scrobble.moe/api/${server.secret}`}
                isReadOnly
                placeholder="Welcome"
              />
              <Button ml={2}>
                <FiClipboard />
              </Button> */
}

export const ServerCardSkeleton = (): JSX.Element => {
  return <div className="flex bg-gray-100 rounded-lg h-20 w-full"></div>;
};
