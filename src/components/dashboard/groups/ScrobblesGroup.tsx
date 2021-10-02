import React from 'react';

import { IconButton } from 'components/IconButton';
import {
  IScrobblesResponse,
  IScrobblesVariables,
  SCROBBLES,
} from 'graphql/queries/scrobbles';
import { FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'urql';

import { ScrobbleCard, ScrobbleCardSkeleton } from '../ScrobbleCard';

export const ScrobblesGroup = (): JSX.Element => {
  const [scrobblesData, refetchScrobbles] = useQuery<
    IScrobblesResponse,
    IScrobblesVariables
  >({
    query: SCROBBLES,
    variables: {
      Input: {
        take: 5,
      },
    },
  });

  return (
    <div className="flex flex-col space-y-2">
      <div
        className="-mt-4 mb-4 ml-auto mr-4 md:mr-auto"
        onClick={(): void => {
          refetchScrobbles({
            requestPolicy: "network-only",
          });
        }}
      >
        <IconButton
          icon={
            <FiRefreshCw
              className={scrobblesData.fetching ? "animate-spin" : ""}
            />
          }
        />
      </div>
      {scrobblesData.fetching && <ScrobbleCardSkeleton />}
      {scrobblesData.data && (
        <div>
          {scrobblesData.data.scrobbles.length > 0 && (
            <div className="space-y-2">
              {scrobblesData.data.scrobbles.map((scrobble) => (
                <ScrobbleCard key={scrobble.id} scrobble={scrobble} />
              ))}
            </div>
          )}
        </div>
      )}
      {scrobblesData.data?.scrobbles.length === 0 && (
        <div className="flex bg-gray-100 rounded-lg h-16 w-full">
          <div className="text-xl my-auto ml-4">No Scrobbles</div>
        </div>
      )}
    </div>
  );
};
