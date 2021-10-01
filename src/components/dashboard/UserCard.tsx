import React from 'react';

import { IProviderLoginUrl } from 'graphql/queries/providerLoginUrl';
import { IUser } from 'graphql/queries/user';
import Image from 'next/image';
import { FiXCircle } from 'react-icons/fi';

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
      <Image
        width="64"
        height="64"
        className="rounded-full bg-secondaryBg"
        src={user.thumb}
      />
      <div className="flex flex-col">
        <h1 className="my-auto text-2xl">{user.username}</h1>
        <div className="flex my-auto space-x-2">
          {unlinkedAccounts.map((account, index) => (
            <div
              key={index}
              className="flex bg-secondaryBg rounded-lg py-1 px-2 space-x-1 hover:bg-background"
            >
              <Image
                className="my-auto"
                width="22"
                height="22"
                src={account === "anilist" ? "/anilist.svg" : "/kitsu.svg"}
              />
              <a
                href={
                  providerLoginUrls.find(
                    (providerLoginUrl) => providerLoginUrl.provider === account
                  )?.url
                }
                className="underline hover:text-pink-600"
              >
                Link
              </a>
            </div>
          ))}
          {user.accounts.map((account, index) => (
            <div
              key={index}
              className="flex bg-secondaryBg rounded-lg py-1 px-2 cursor-pointer space-x-1 hover:bg-background"
            >
              <Image
                className="my-auto"
                width="22"
                height="22"
                src={
                  account.provider === "ANILIST" ? "/anilist.svg" : "/kitsu.svg"
                }
              />
              <p>{account.accountId}</p>
              <FiXCircle className="my-auto" />
            </div>
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
