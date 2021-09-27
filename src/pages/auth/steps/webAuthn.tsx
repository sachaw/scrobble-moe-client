import React from 'react';

import { Card } from 'components/Card';
import {
  IWebauthnResponse,
  IWebauthnVariables,
  WEBAUTHN,
} from 'graphql/mutations/webauthn';
import { encode } from 'universal-base64';
import { useMutation } from 'urql';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import {
  AuthenticationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationCredentialJSON,
} from '@simplewebauthn/typescript-types';

export type IWebAuthnOptionsType =
  | PublicKeyCredentialCreationOptionsJSON
  | PublicKeyCredentialRequestOptionsJSON;

interface webAuthnProps {
  type: "AUTHENTICATION" | "REGISTRATION";
  options: IWebAuthnOptionsType;
  plexToken: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const WebAuthn = ({
  type,
  options,
  plexToken,
  setError,
}: webAuthnProps): JSX.Element => {
  const [webauthn, getWebauthn] = useMutation<
    IWebauthnResponse,
    IWebauthnVariables
  >(WEBAUTHN);

  const authenticate = React.useCallback(
    async (
      decodedWebAuthnOptions: PublicKeyCredentialRequestOptionsJSON
    ): Promise<void | AuthenticationCredentialJSON> => {
      return startAuthentication(decodedWebAuthnOptions).then(
        (options: AuthenticationCredentialJSON) => {
          void getWebauthn({
            Input: {
              type: "AUTHENTICATION",
              verification: encode(JSON.stringify(options)),
              plexToken,
            },
          });
        }
      );
    },
    [getWebauthn, plexToken]
  );

  const register = React.useCallback(
    async (
      decodedWebAuthnOptions: PublicKeyCredentialCreationOptionsJSON
    ): Promise<void | RegistrationCredentialJSON> => {
      return startRegistration(decodedWebAuthnOptions).then((options) => {
        void getWebauthn({
          Input: {
            type: "REGISTRATION",
            verification: encode(JSON.stringify(options)),
            plexToken: plexToken,
          },
        });
      });
    },
    [getWebauthn, plexToken]
  );

  const handleWebAuthn = React.useCallback((): void => {
    switch (type) {
      case "AUTHENTICATION":
        void authenticate(options as PublicKeyCredentialRequestOptionsJSON);

        break;

      case "REGISTRATION":
        void register(options as PublicKeyCredentialCreationOptionsJSON);
    }
  }, [authenticate, register, options, type]);

  React.useEffect(() => {
    handleWebAuthn();
  }, [handleWebAuthn]);

  React.useEffect(() => {
    setError(webauthn.error?.message);
  }, [webauthn.error, setError]);

  return (
    <Card>
      {!webauthn.data && (
        <Flex justify="space-between">
          <Text my="auto">Started Webauthn</Text>
          <Button marginTop={2} onClick={handleWebAuthn}>
            Retry
          </Button>
        </Flex>
      )}

      {webauthn.data && (
        <>
          <Box color="green.500" marginTop={2}>
            Success!
          </Box>

          <Button as="a" href="/dashboard" variant="outline" marginTop={4}>
            Go to Dashboard
          </Button>
        </>
      )}
    </Card>
  );
};

export default WebAuthn;
