import React from 'react';

import { IUserResponse, IUserVariables, USER } from 'graphql/queries/user';
import { useQuery } from 'urql';

export const SettingsGroup = (): JSX.Element => {
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

  return (
    <div>
      <p>Settings</p>
    </div>
  );
};
