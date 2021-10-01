import React from 'react';

import {
  IProviderLoginUrlResponse,
  IProviderLoginUrlVariables,
  PROVIDER_LOGIN_URLS,
} from 'graphql/queries/providerLoginUrl';
import { IUserResponse, IUserVariables, USER } from 'graphql/queries/user';
import { useQuery } from 'urql';

import { UserCard, UserCardSkeleton } from '../UserCard';

export const OverviewGroup = (): JSX.Element => {
  const [unlinkedAccounts, setUnlinkedAccounts] = React.useState<string[]>([]);

  const [linkableAccounts, refetchLinkableAccounts] = React.useState([
    "ANILIST",
    "KITSU",
  ]);

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
    <div>
      {providerLoginUrls.fetching ||
        (usersData.fetching && <UserCardSkeleton />)}

      {providerLoginUrls.data && usersData.data && (
        <UserCard
          user={usersData.data.users[0]}
          unlinkedAccounts={unlinkedAccounts}
          providerLoginUrls={providerLoginUrls.data.providerLoginUrl}
        />
      )}
    </div>
  );
};
