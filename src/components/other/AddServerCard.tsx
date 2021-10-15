import React from 'react';

import { Button } from 'components/Button';
import { SelectableCard } from 'components/SelectableCard';
import { IPlexAccountServer } from 'graphql/queries/plexAccountServers';
import { FiLink, FiX } from 'react-icons/fi';

export interface AddServerCardProps {
  server: IPlexAccountServer;
  linkServer: (machineIdentifier: string) => void;
  linked?: boolean;
}

export const AddServerCard = ({
  server,
  linkServer,
  linked,
}: AddServerCardProps): JSX.Element => {
  return (
    <SelectableCard status={linked ? "success" : "pening"}>
      <div className="flex justify-between w-full space-x-2">
        <div className="my-auto font-medium truncate">{server.name}</div>
        {linked ? (
          <Button
            onClick={(): void => {
              //
            }}
            rightIcon={<FiX />}
          >
            Unlink
          </Button>
        ) : (
          <Button
            onClick={(): void => {
              linkServer(server.machineIdentifier);
            }}
            rightIcon={<FiLink />}
          >
            Link
          </Button>
        )}
      </div>
    </SelectableCard>
  );
};
