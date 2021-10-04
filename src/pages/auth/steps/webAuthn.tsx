import React from 'react';

import { Button, LinkButton } from 'components/Button';
import {
  IWebauthnResponse,
  IWebauthnVariables,
  WEBAUTHN,
} from 'graphql/mutations/webauthn';
import { encode } from 'universal-base64';
import { useMutation } from 'urql';

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
    <div>
      {!webauthn.data && (
        <div className="flex justify-between">
          <div>Started Webauthn</div>
          <Button onClick={handleWebAuthn}>Retry</Button>
        </div>
      )}

      {webauthn.data && (
        <>
          <div color="green.500">Success!</div>

          <LinkButton href="/dashboard">Go to Dashboard</LinkButton>
        </>
      )}
    </div>
  );
};

export default WebAuthn;
