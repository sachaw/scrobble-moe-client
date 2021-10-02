import React from 'react';

import {
  AUTHENTICATE,
  IAuthenticateResponse,
  IAuthenticateVariables,
} from 'graphql/mutations/authenticate';
import Image from 'next/image';
import { decode } from 'universal-base64';
import { useMutation } from 'urql';

import WebAuthn, { IWebAuthnOptionsType } from './webAuthn';

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
    <div>
      <div className="flex">
        <Image src={webAuthnOptions.data?.authenticate.plexUser.avatar ?? ""} />
        <div>{webAuthnOptions.data?.authenticate.plexUser.username}</div>
      </div>
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
    </div>
  );
};

export default Token;
