import React from 'react';

import { AUTH_CHECK, IAuthCheckResponse } from 'graphql/queries/authCheck';
import { AiOutlineLogin } from 'react-icons/ai';
import { FiHome } from 'react-icons/fi';
import { useQuery } from 'urql';

import { Button, Spinner } from '@chakra-ui/react';

export const LoginButton = (): JSX.Element => {
  const [authCheck, refetchAuthCheck] = useQuery<IAuthCheckResponse>({
    query: AUTH_CHECK,
  });

  if (authCheck.fetching) {
    return (
      <Button leftIcon={<Spinner />} disabled>
        Loading
      </Button>
    );
  }

  return authCheck.data?.authCheck ? (
    <Button as="a" href="/dashboard" leftIcon={<FiHome />}>
      Dashboard
    </Button>
  ) : (
    <Button as="a" href="/auth" leftIcon={<AiOutlineLogin />}>
      Login
    </Button>
  );
};
