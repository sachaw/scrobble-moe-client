import React from 'react';

import { SelectableCard } from 'components/SelectableCard';
import { IAuthenticator } from 'graphql/queries/authenticators';

export interface CredentialCardProps {
  authenticator: IAuthenticator;
}

export const CredentialCard = ({
  authenticator,
}: CredentialCardProps): JSX.Element => {
  return (
    <SelectableCard
      status={authenticator.revoked ? "fail" : "success"}
      updatedAt={authenticator.updatedAt}
    >
      <div className="flex justify-between w-full">
        <div>
          <div className="text-sm">{authenticator.AAGUID ?? "Unknown"}</div>
        </div>
      </div>
    </SelectableCard>
  );
};
