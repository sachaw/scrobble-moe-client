import React from "react";

import { SelectableCard } from "components/SelectableCard";
import { IScrobble } from "graphql/queries/scrobbles";
import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";

import { Dialog } from "@headlessui/react";

export interface UserCardProps {
  scrobble: IScrobble;
}

export const ScrobbleCard = ({ scrobble }: UserCardProps): JSX.Element => {
  const [scrobbleCardOpen, setScrobbleCardOpen] = React.useState(false);
  return (
    <SelectableCard
      status="success"
      onClick={(): void => {
        setScrobbleCardOpen(true);
      }}
    >
      <div className="flex justify-between w-full">
        <div>
          <div className="flex text-gray-600">
            <small className="flex my-auto mr-1 text-sm ">Success</small>
            {scrobble.accounts.map((account, index) => (
              <Image
                className="my-auto"
                width="22"
                height="22"
                key={index}
                src={
                  account.provider === "ANILIST" ? "/anilist.svg" : "/kitsu.svg"
                }
              />
            ))}
          </div>
          <div className="text-sm">
            {scrobble.anilistData?.title ?? "Unknown"}
          </div>
        </div>
        <div>Episode {scrobble.episode}</div>
        <div className="flex">
          <small className="my-auto text-xs font-medium text-gray-600">
            {new Date(scrobble.updatedAt).toLocaleString()}
          </small>
          <FiMoreVertical className="my-auto ml-2 text-lg cursor-pointer hover:text-gray-600" />
        </div>
      </div>
      <Dialog
        className="fixed inset-0 z-10 overflow-y-auto"
        open={scrobbleCardOpen}
        onClose={(): void => setScrobbleCardOpen(false)}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative max-w-sm mx-auto bg-white rounded">
            <Dialog.Title>Complete your order</Dialog.Title>

            {/* ... */}
          </div>
        </div>

        <button onClick={(): void => setScrobbleCardOpen(false)}>
          Deactivate
        </button>
      </Dialog>
    </SelectableCard>
  );
};
