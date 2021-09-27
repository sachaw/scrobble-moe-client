import React from 'react';

import {
  AUTHENTICATE,
  IAuthenticateResponse,
  IAuthenticateVariables,
} from 'graphql/mutations/authenticate';
import { decode } from 'universal-base64';
import { useMutation } from 'urql';

import { Box, Flex, Heading, Image } from '@chakra-ui/react';

import { IWebAuthnOptionsType, WebAuthn } from './webAuthn';

interface webAuthnProps {
  plexToken: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Token = ({ plexToken, setError }: webAuthnProps): JSX.Element => {
  const [webAuthnOptions, getWebAuthnOptions] = useMutation<
    IAuthenticateResponse,
    IAuthenticateVariables
  >(AUTHENTICATE);

  React.useEffect(() => {
    void getWebAuthnOptions({
      Input: {
        plexToken,
      },
    });
  }, [plexToken, getWebAuthnOptions]);

  React.useEffect(() => {
    setError(webAuthnOptions.error?.message);
  }, [webAuthnOptions.error, setError]);

  return (
    <Box textAlign="center" marginTop={4}>
      <Flex direction="row" mb="2rem">
        <Image
          h="4rem"
          w="4rem"
          mr="2rem"
          src={webAuthnOptions.data?.authenticate.plexUser.avatar}
          rounded="full"
        />
        <Heading as="h5" my="auto">
          {webAuthnOptions.data?.authenticate.plexUser.username}
        </Heading>
      </Flex>
      {webAuthnOptions.data && (
        <WebAuthn
          plexToken={plexToken}
          type={webAuthnOptions.data.authenticate.type}
          options={
            JSON.parse(
              decode(webAuthnOptions.data.authenticate.webauthnOptions)
            ) as IWebAuthnOptionsType
          }
          setError={setError}
        />
      )}
    </Box>
  );
};

export default Token;
