import React from 'react';

import {
  IScrobblesResponse,
  IScrobblesVariables,
  SCROBBLES,
} from 'graphql/queries/scrobbles';
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
    <div>
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
