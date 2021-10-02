import React from "react";

import { CardLoading } from "components/Card";
import { IconButton } from "components/IconButton";
import { TabLayout } from "components/TabLayout";
import {
  IProviderLoginUrlResponse,
  IProviderLoginUrlVariables,
  PROVIDER_LOGIN_URLS,
} from "graphql/queries/providerLoginUrl";
import { IUserResponse, IUserVariables, USER } from "graphql/queries/user";
import { FiRefreshCw } from "react-icons/fi";
import { useQuery } from "urql";

import { UserCard } from "../UserCard";

export const OverviewGroup = (): JSX.Element => {
  const [unlinkedAccounts, setUnlinkedAccounts] = React.useState<string[]>([]);

  const [linkableAccounts] = React.useState(["ANILIST", "KITSU"]);

  const [usersData, refetchUsersData] = useQuery<IUserResponse, IUserVariables>(
    {
      query: USER,
      variables: {
        Input: {
          take: 5,
        },
      },
    }
  );

  const [providerLoginUrls, refetchProviderLoginUrls] = useQuery<
    IProviderLoginUrlResponse,
    IProviderLoginUrlVariables
  >({
    query: PROVIDER_LOGIN_URLS,
    variables: {
      Input: {
        providers: linkableAccounts,
      },
    },
  });

  React.useEffect(() => {
    const userAccounts =
      usersData?.data?.users[0]?.accounts.map((account) => account.provider) ??
      [];

    setUnlinkedAccounts(
      linkableAccounts
        .map((account) => (userAccounts.includes(account) ? "" : account))
        .filter((acc) => acc)
    );
  }, [linkableAccounts, usersData.data]);

  return (
    <TabLayout
      actions={
        <IconButton
          onClick={(): void => {
            refetchProviderLoginUrls({
              requestPolicy: "network-only",
            });
            refetchUsersData({
              requestPolicy: "network-only",
            });
          }}
          icon={
            <FiRefreshCw
              className={
                providerLoginUrls.fetching || usersData.fetching
                  ? "animate-spin"
                  : ""
              }
            />
          }
        />
      }
    >
      {providerLoginUrls.fetching || (usersData.fetching && <CardLoading />)}

      {providerLoginUrls.data &&
        usersData.data &&
        !providerLoginUrls.fetching &&
        !usersData.fetching && (
          <UserCard
            user={usersData.data.users[0]}
            unlinkedAccounts={unlinkedAccounts}
            providerLoginUrls={providerLoginUrls.data.providerLoginUrl}
          />
        )}
    </TabLayout>
  );
};
