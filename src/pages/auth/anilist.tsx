import React from 'react';

import {
  ADD_LINKED_ACCOUNT,
  IAddLinkedAccountResponse,
  IAddLinkedAccountVariables,
} from 'graphql/mutations/addLinkAccount';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';

import { Box, Button, Code, Heading } from '@chakra-ui/react';

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
    <>
      <Box
        bg="gray.700"
        py="8"
        px={{ base: "4", md: "10" }}
        shadow="base"
        rounded={{ sm: "lg" }}
      >
        <Heading textAlign="center">Link your AniList account.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Code overflowWrap="anywhere">{router.query.code}</Code>
          {linkedAccount.error && (
            <>
              <Box color="red.500" marginTop={2}>
                {linkedAccount.error.message}
              </Box>
              <Button as="a" href="/dashboard" variant="outline" marginTop={4}>
                Go to Dashboard
              </Button>
            </>
          )}
          {linkedAccount.data && (
            <>
              <Box color="green.500" marginTop={2}>
                Success!
              </Box>

              <Button as="a" href="/dashboard" variant="outline" marginTop={4}>
                Go to Dashboard
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AniList;
