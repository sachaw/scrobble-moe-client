import React from 'react';

import { useRouter } from 'next/router';

import { gql, useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Code,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Auth = (): JSX.Element => {
  const router = useRouter();

  const LINK_ACCOUNT = gql`
    mutation AddLinkedAccountMutation($Input: AddLinkedAccountInput!) {
      addLinkedAccount(addLinkedAccountInput: $Input) {
        id
      }
    }
  `;

  const [addLinkedAccount, linkedAccount] = useMutation(LINK_ACCOUNT);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (router.query.code?.length) {
      void addLinkedAccount({
        variables: {
          Input: {
            code: router.query.code,
          },
        },
      }).catch(() => {
        setError("Error linking account");
      });
    } else {
      setError("No code found");
    }
  }, [router.query.code]);

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        py="8"
        px={{ base: "4", md: "10" }}
        shadow="base"
        rounded={{ sm: "lg" }}
      >
        <Heading textAlign="center">Link your AniList account.</Heading>

        {error && <Text textAlign="center">{error}</Text>}
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

export default Auth;
