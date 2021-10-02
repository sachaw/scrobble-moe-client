import React from 'react';

import { Button } from 'components/Button';
import { IProviderLoginUrl } from 'graphql/queries/providerLoginUrl';
import { IUser } from 'graphql/queries/user';
import Image from 'next/image';
import { FiLink, FiXCircle } from 'react-icons/fi';

export interface UserCardProps {
  user: IUser;
  unlinkedAccounts: string[];
  providerLoginUrls: IProviderLoginUrl[];
}

export const UserCard = ({
  user,
  unlinkedAccounts,
  providerLoginUrls,
}: UserCardProps): JSX.Element => {
  return (
    <div className="flex space-x-4 bg-gray-100 rounded-lg p-2 select-none">
      <div className="my-auto">
        <Image
          width="64"
          height="64"
          className="rounded-full bg-secondaryBg"
          src={user.thumb}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="my-auto text-2xl">{user.username}</h1>
        <div className="flex my-auto space-x-2">
          {unlinkedAccounts.map((account, index) => (
            <Button
              key={index}
              rightIcon={
                <a
                  href={
                    providerLoginUrls.find(
                      (providerLoginUrl) =>
                        providerLoginUrl.provider === account
                    )?.url ?? ""
                  }
                >
                  <div className="sr-only">Link {account}</div>
                  <FiLink />
                </a>
              }
            >
              <Image
                className="my-auto"
                width="22"
                height="22"
                src={account === "ANILIST" ? "/anilist.svg" : "/kitsu.svg"}
              />
              <p>Unlinked</p>
            </Button>
          ))}
          {user.accounts.map((account) => (
            <Button key={account.id} rightIcon={<FiXCircle />}>
              <Image
                className="my-auto"
                width="22"
                height="22"
                src={
                  account.provider === "ANILIST" ? "/anilist.svg" : "/kitsu.svg"
                }
              />
              <p>{account.accountId}</p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const UserCardSkeleton = (): JSX.Element => {
  return (
    <div className="bg-gray-100 rounded-lg h-20 w-full animate-pulse"></div>
  );
};
