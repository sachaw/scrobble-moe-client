import React from 'react';

import { SelectableCard } from 'components/SelectableCard';
import { IScrobble } from 'graphql/queries/scrobbles';
import Image from 'next/image';

export interface UserCardProps {
  scrobble: IScrobble;
}

export const ScrobbleCard = ({ scrobble }: UserCardProps): JSX.Element => {
  return (
    <SelectableCard status="success" updatedAt={scrobble.updatedAt}>
      <div className="flex justify-between w-full">
        <div>
          <div className="flex text-gray-600">
            <small className="flex my-auto mr-1 text-sm ">
              Episode {scrobble.episode}
            </small>
            {scrobble.accounts.map((account, index) => (
              <Image
		alt="Provider"
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
      </div>
    </SelectableCard>
  );
};
