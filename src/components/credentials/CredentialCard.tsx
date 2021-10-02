import React from "react";

import { SelectableCard } from "components/SelectableCard";
import { IAuthenticator } from "graphql/queries/authenticators";
import { FiMoreVertical } from "react-icons/fi";
import TimeAgo from "react-timeago";

export interface CredentialCardProps {
  authenticator: IAuthenticator;
}

export const CredentialCard = ({
  authenticator,
}: CredentialCardProps): JSX.Element => {
  return (
    <SelectableCard status={authenticator.revoked ? "fail" : "success"}>
      <div className="flex justify-between w-full">
        <div>
          <div className="text-sm">{authenticator.AAGUID ?? "Unknown"}</div>
        </div>
        <div className="flex">
          <small className="my-auto text-xs font-medium text-gray-600">
            <TimeAgo date={authenticator.updatedAt} />
          </small>
          <FiMoreVertical className="my-auto ml-2 text-lg cursor-pointer hover:text-gray-600" />
        </div>
      </div>
    </SelectableCard>
  );
};
