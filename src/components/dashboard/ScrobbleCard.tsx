import React from "react";

import { SelectableCard } from "components/SelectableCard";
import { IScrobble } from "graphql/queries/scrobbles";
import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";
import TimeAgo from "react-timeago";

export interface UserCardProps {
  scrobble: IScrobble;
}

export const ScrobbleCard = ({ scrobble }: UserCardProps): JSX.Element => {
  return (
    <SelectableCard status="success">
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
            <TimeAgo date={scrobble.updatedAt} />
          </small>
          <FiMoreVertical className="my-auto ml-2 text-lg cursor-pointer hover:text-gray-600" />
        </div>
      </div>
    </SelectableCard>
  );
};
