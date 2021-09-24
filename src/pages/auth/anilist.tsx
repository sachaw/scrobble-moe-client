import React from "react";

import { useRouter } from "next/router";

import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Heading,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

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
      });
    } else {
      setError("No code found");
    }
  }, [router.query.code]);

  React.useEffect(() => {
    if (linkedAccount.data && !linkedAccount.error) {
      setError("Request errored");
    }
  });

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

        {error && <Heading textAlign="center">{error}</Heading>}
        <Box textAlign="center" marginTop={4}>
          {router.query.code}
          {linkedAccount.error && (
            <Box color="red.500" marginTop={2}>
              {linkedAccount.error.message}
            </Box>
          )}
          {linkedAccount.data && (
            <>
              <Box color="green.500" marginTop={2}>
                Success!
              </Box>

              <Link href="/dashboard" passHref>
                <Button variantColor="green" variant="outline" marginTop={4}>
                  Go to Dashboard
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Auth;
