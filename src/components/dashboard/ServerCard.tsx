import React from "react";

import { IServer } from "graphql/queries/servers";
import Image from "next/image";
import { FiActivity, FiChevronDown, FiTrash } from "react-icons/fi";

import { Disclosure } from "@headlessui/react";

import { Button } from "../Button";
import { Input } from "../Input";

export interface ServerCardProps {
  server: IServer;
}

export const ServerCard = ({ server }: ServerCardProps): JSX.Element => {
  return (
    <Disclosure>
      {({ open }): JSX.Element => (
        <div
          className={`flex flex-col w-full bg-gray-100 md:rounded-lg p-4 select-none hover:border-gray-200 md:border ${
            open ? "border-gray-200" : "border-gray-100"
          }`}
        >
          <Disclosure.Button className="w-full">
            <div className="flex justify-between w-full space-x-4">
              <div className="flex space-x-2">
                <Image src="/plex.svg" width="45" height="45" />
                <div className="flex flex-col">
                  <div className="mr-auto text-lg">{server.name}</div>
                  <div className="w-32 mr-auto text-sm font-light text-gray-600 truncate">
                    {server.uuid}
                  </div>
                </div>
              </div>

              <FiChevronDown
                className={`my-auto text-xl ${
                  open ? "transform rotate-180" : ""
                }`}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className="flex flex-col mt-4 space-y-4">
            <hr />
            <div className="flex ml-auto space-x-2">
              <Button rightIcon={<FiActivity />}>Action</Button>
              <Button rightIcon={<FiTrash />}>Delete</Button>
            </div>
            <Input
              disabled
              value={`https://webhook.scrobble.moe/${server.secret}`}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export const ServerCardSkeleton = (): JSX.Element => {
  return <div className="flex w-full h-20 bg-gray-100 rounded-lg"></div>;
};
