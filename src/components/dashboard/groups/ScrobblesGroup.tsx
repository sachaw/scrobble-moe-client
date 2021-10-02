import React from "react";

import { CardLoading } from "components/Card";
import { IconButton } from "components/IconButton";
import { TabLayout } from "components/TabLayout";
import {
  IScrobblesResponse,
  IScrobblesVariables,
  SCROBBLES,
} from "graphql/queries/scrobbles";
import { FiRefreshCw } from "react-icons/fi";
import { useQuery } from "urql";

import { ScrobbleCard } from "../ScrobbleCard";

export const ScrobblesGroup = (): JSX.Element => {
  const [scrobbles, refetchScrobbles] = useQuery<
    IScrobblesResponse,
    IScrobblesVariables
  >({
    query: SCROBBLES,
    variables: {
      Input: {
        take: 5,
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });

  return (
    <TabLayout
      actions={
        <IconButton
          onClick={(): void => {
            refetchScrobbles({
              requestPolicy: "network-only",
            });
          }}
          icon={
            <FiRefreshCw className={scrobbles.fetching ? "animate-spin" : ""} />
          }
        />
      }
    >
      {scrobbles.fetching && <CardLoading />}
      {scrobbles.data && !scrobbles.fetching && (
        <div>
          {scrobbles.data.scrobbles.length > 0 && (
            <div className="space-y-2">
              {scrobbles.data.scrobbles.map((scrobble) => (
                <ScrobbleCard key={scrobble.id} scrobble={scrobble} />
              ))}
            </div>
          )}
        </div>
      )}
      {scrobbles.data?.scrobbles.length === 0 && (
        <div className="flex w-full h-16 bg-gray-100 rounded-lg">
          <div className="my-auto ml-4 text-xl">No Scrobbles</div>
        </div>
      )}
    </TabLayout>
  );
};
