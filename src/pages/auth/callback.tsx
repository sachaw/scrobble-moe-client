import React from 'react';

import { Card } from 'components/Card';
import { useRouter } from 'next/dist/client/router';
import { PlexOauth } from 'plex-oauth';
import { decode, encode } from 'universal-base64';

import { gql, useMutation } from '@apollo/client';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import type {
  AuthenticationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationCredentialJSON,
} from '@simplewebauthn/typescript-types';

export interface IAuthenticateResponse {
  authenticate: {
    type: "AUTHENTICATION" | "REGISTRATION";
    webauthnOptions: string;
    plexUser: {
      username: string;
      avatar: string;
    };
  };
}

export interface IWebauthnResponse {
  webauthn: {
    success: boolean;
  };
}

const AUTHENTICATE = gql`
  mutation AuthenticateMutation($Input: AuthenticationInput!) {
    authenticate(authenticationInput: $Input) {
      type
      webauthnOptions
      plexUser {
        username
        avatar
      }
    }
  }
`;

const WEBAUTHN = gql`
  mutation WebauthnMutation($Input: WebauthnInput!) {
    webauthn(WebauthnInput: $Input) {
      success
    }
  }
`;

const Auth = (): JSX.Element => {
  const router = useRouter();

  const [error, setError] = React.useState<string>();
  const [plexToken, setPlexToken] = React.useState<string>();
  const [getWebAuthnOptions, webAuthnOptions] =
    useMutation<IAuthenticateResponse>(AUTHENTICATE);
  const [getTokens, tokens] = useMutation<IWebauthnResponse>(WEBAUTHN);
  const [authStep, setAuthStep] = React.useState<
    | "ERROR"
    | "TOKEN_WAITING"
    | "HAS_TOKEN"
    | "WEBAUTHN_WAITING"
    | "WEBAUTHN_STARTED"
  >("TOKEN_WAITING");

  const plexOauth = new PlexOauth({
    clientIdentifier: "7f9de3ba-e12b-11ea-87d0-0242ac130003",
    product: "scrobble.moe",
    device: "Internet",
    version: "1",
    forwardUrl: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
  });

  React.useEffect(() => {
    const pin = localStorage.getItem("plexPin");
    if (pin) {
      void checkPin(parseInt(pin));
    } else {
      setError("No pin found");
      setAuthStep("ERROR");
    }
  }, []);

  const checkPin = (pin: number): void => {
    if (authStep === "TOKEN_WAITING") {
      const pollPin = setInterval(() => {
        void plexOauth
          .checkForAuthToken(pin)
          .then((token) => {
            console.log(token);
            if (token) {
              setPlexToken(token);
              setAuthStep("HAS_TOKEN");
            } else {
              setError("No token returned");
              setAuthStep("ERROR");
            }
            clearInterval(pollPin);
          })
          .catch((e) => {
            clearInterval(pollPin);

            setError("Request errored");
            setAuthStep("ERROR");
          });
      }, 1000);
    }
  };

  React.useEffect(() => {
    if (authStep === "HAS_TOKEN") {
      void getWebAuthnOptions({
        variables: {
          Input: {
            plexToken: plexToken,
          },
        },
      });
    }
  }, [plexToken, getWebAuthnOptions, authStep]);

  React.useEffect(() => {
    if (webAuthnOptions.loading) {
      setAuthStep("WEBAUTHN_WAITING");
    }
    if (webAuthnOptions.error) {
      setError("Webauthn request failed");
      setAuthStep("ERROR");
    }
    if (authStep === "WEBAUTHN_WAITING" && webAuthnOptions.data) {
      setAuthStep("WEBAUTHN_STARTED");

      const decodedWebAuthnOptions = JSON.parse(
        decode(webAuthnOptions.data.authenticate.webauthnOptions)
      ) as
        | PublicKeyCredentialRequestOptionsJSON
        | PublicKeyCredentialCreationOptionsJSON;
      switch (webAuthnOptions.data.authenticate.type) {
        case "AUTHENTICATION":
          void startAuthentication(
            decodedWebAuthnOptions as PublicKeyCredentialRequestOptionsJSON
          ).then((options: AuthenticationCredentialJSON) => {
            void getTokens({
              variables: {
                Input: {
                  type: "AUTHENTICATION",
                  verification: encode(JSON.stringify(options)),
                  plexToken: plexToken,
                },
              },
            });
          });

          break;

        case "REGISTRATION":
          void startRegistration(
            decodedWebAuthnOptions as PublicKeyCredentialCreationOptionsJSON
          ).then((options: RegistrationCredentialJSON) => {
            void getTokens({
              variables: {
                Input: {
                  type: "REGISTRATION",
                  verification: encode(JSON.stringify(options)),
                  plexToken: plexToken,
                },
              },
            });
          });
      }
    }
  }, [webAuthnOptions]);

  React.useEffect(() => {
    if (tokens.error) {
      setError("Webauthn failed");
      setAuthStep("ERROR");
    }
    if (authStep === "WEBAUTHN_STARTED" && tokens.data) {
      void router.push("/dashboard");
    }
  }, [tokens, authStep, router]);

  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      py="8"
      px={{ base: "4", md: "10" }}
      shadow="base"
      rounded={{ sm: "lg" }}
    >
      {authStep === "ERROR" && (
        <>
          <Heading textAlign="center">Sign in with Plex</Heading>

          <Box textAlign="center" marginTop={4}>
            <Text>{error}</Text>
          </Box>
        </>
      )}

      {authStep === "TOKEN_WAITING" && (
        <>
          <Heading textAlign="center">Sign in with Plex</Heading>

          <Box textAlign="center" marginTop={4}>
            <Text>Loading token</Text>
          </Box>
        </>
      )}

      {authStep === "HAS_TOKEN" && (
        <>
          <Heading textAlign="center">Sign in with Plex</Heading>

          <Box textAlign="center" marginTop={4}>
            <Text>Has Token</Text>
          </Box>
        </>
      )}

      {authStep === "WEBAUTHN_WAITING" && (
        <>
          <Heading textAlign="center">Sign in with Plex</Heading>

          <Box textAlign="center" marginTop={4}>
            <Text>Loading webauthn</Text>
          </Box>
        </>
      )}

      {authStep === "WEBAUTHN_STARTED" && (
        <>
          <Heading textAlign="center">Sign in with Plex</Heading>

          <Box textAlign="center" marginTop={4}>
            <Card>
              <Flex direction="row">
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
            </Card>
            <Text>Started Webauthn</Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Auth;
