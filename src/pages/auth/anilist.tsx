import React from 'react';

import { Button } from 'components/Button';
import {
  ADD_LINKED_ACCOUNT,
  IAddLinkedAccountResponse,
  IAddLinkedAccountVariables,
} from 'graphql/mutations/addLinkAccount';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';

const AniList = (): JSX.Element => {
  const router = useRouter();

  const [linkedAccount, addLinkedAccount] = useMutation<
    IAddLinkedAccountResponse,
    IAddLinkedAccountVariables
  >(ADD_LINKED_ACCOUNT);

  React.useEffect(() => {
    if (router.query.code?.length) {
      void addLinkedAccount({
        Input: {
          code: router.query.code as string,
        },
      });
    }
  }, [router.query.code, addLinkedAccount]);

  return (
    <div>
      <div>Link your AniList account.</div>

      <div>
        <div>{router.query.code}</div>
        {linkedAccount.error && (
          <>
            <div>{linkedAccount.error.message}</div>
            <Link passHref href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </>
        )}
        {linkedAccount.data && (
          <>
            <div>Success!</div>

            <Link passHref href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AniList;
