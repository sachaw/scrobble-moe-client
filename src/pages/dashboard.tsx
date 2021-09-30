import React from 'react';

import { Card } from 'components/new/Card';
import { SelectableCard } from 'components/new/SelectableCard';
import {
  IProviderLoginUrlResponse,
  IProviderLoginUrlVariables,
  PROVIDER_LOGIN_URLS,
} from 'graphql/queries/providerLoginUrl';
import { IUserResponse, IUserVariables, USER } from 'graphql/queries/user';
import Image from 'next/image';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { useQuery } from 'urql';

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';

const Dashboard = (): JSX.Element => {
  const [clipboardServer, setClipboardServer] = React.useState<string>("");
  const { hasCopied, onCopy } = useClipboard(clipboardServer);
  const [unlinkedAccounts, setUnlinkedAccounts] = React.useState<string[]>([]);

  const [linkableAccounts, refetchLinkableAccounts] = React.useState([
    "ANILIST",
    "KITSU",
  ]);

  const [usersData, refetchUsersData] = useQuery<IUserResponse, IUserVariables>(
    {
      query: USER,
      variables: {
        Input: {
          take: 5,
        },
      },
    }
  );

  const [providerLoginUrls, refetchProviderLoginUrls] = useQuery<
    IProviderLoginUrlResponse,
    IProviderLoginUrlVariables
  >({
    query: PROVIDER_LOGIN_URLS,
    variables: {
      Input: {
        providers: linkableAccounts,
      },
    },
  });

  React.useEffect(() => {
    const userAccounts =
      usersData?.data?.users[0]?.accounts.map((account) => account.provider) ??
      [];

    setUnlinkedAccounts(
      linkableAccounts
        .map((account) => (userAccounts.includes(account) ? "" : account))
        .filter((acc) => acc)
    );
  }, [linkableAccounts, usersData.data]);

  return (
    <Center>
      <Box p="2" maxW="50rem" w="full">
        {usersData.fetching && (
          <Box>
            <Text>Loading...</Text>
          </Box>
        )}
        {usersData.error && (
          <Box>
            <Text>Error</Text>
          </Box>
        )}
        {usersData.data && (
          <>
            <Card title="Dashboard">
              <Flex direction="row">
                <Image
                  width="64"
                  height="64"
                  className="rounded-full mr-8"
                  src={usersData.data.users[0].thumb}
                />
                <Heading as="h5" my="auto">
                  {usersData.data.users[0].username}
                </Heading>
                <Box ml="auto" my="auto">
                  {unlinkedAccounts.map((account, index) => (
                    <Box key={index}>
                      {providerLoginUrls.fetching && (
                        <Button
                          mx="1"
                          marginTop={2}
                          as="a"
                          target="_blank"
                          size="sm"
                        >
                          Loading
                        </Button>
                      )}

                      {providerLoginUrls.data && (
                        <Button
                          mx="1"
                          marginTop={2}
                          as="a"
                          href={
                            providerLoginUrls.data.providerLoginUrl.find(
                              (providerLoginUrl) =>
                                providerLoginUrl.provider === account
                            )?.url
                          }
                          size="sm"
                        >
                          Link {account}
                        </Button>
                      )}
                    </Box>
                  ))}
                  {usersData.data.users[0].accounts.map((account) => (
                    <Tooltip
                      key={account.id}
                      mx="1"
                      hasArrow
                      aria-label={account.accountId}
                      label={account.accountId}
                      placement="auto"
                    >
                      <Button
                        marginTop={2}
                        as="a"
                        href={`https://anilist.co/user/${account.accountId}`}
                        target="_blank"
                        size="sm"
                      >
                        {account.provider}
                      </Button>
                    </Tooltip>
                  ))}
                </Box>
              </Flex>

              <Flex justify="space-between" mb="2">
                <Button href="/addServer" my="auto" px="10" as="a" size="sm">
                  Add server
                </Button>
              </Flex>
              <hr />
              <br />
              <h1>Servers</h1>
              {usersData.data.users[0].servers.map((server, index) => (
                <div key={index}>
                  <Flex justify="space-between">
                    <Text isTruncated>{server.name}</Text>
                    <Flex>
                      <Input
                        w="16rem"
                        value={`https://webhook.scrobble.moe/api/${server.secret}`}
                        isReadOnly
                        placeholder="Welcome"
                      />
                      <Button
                        onClick={(): void => {
                          setClipboardServer(
                            `https://webhook.scrobble.moe/api/${server.secret}`
                          );
                          onCopy();
                        }}
                        ml={2}
                      >
                        {hasCopied ? <FaClipboardCheck /> : <FaClipboard />}
                      </Button>
                    </Flex>
                  </Flex>
                </div>
              ))}
              <hr />
              <br />
              {usersData.data.users[0].scrobbles.length > 0 && (
                <div className="space-y-2">
                  {usersData.data.users[0].scrobbles.map((scrobble) => (
                    <SelectableCard status="success" key={scrobble.id}>
                      <div className="flex w-full justify-between">
                        <div>
                          <div className="flex text-gray-600">
                            <small className="flex my-auto mr-1">Success</small>
                            {scrobble.accounts.map((account, index) => (
                              <Image
                                className="my-auto"
                                width="22"
                                height="22"
                                key={index}
                                src={
                                  account.provider === "ANILIST"
                                    ? "/anilist.svg"
                                    : "/kitsu.svg"
                                }
                              />
                            ))}
                          </div>
                          <div>
                            <p>{scrobble.anilistData?.title ?? "Unknown"}</p>
                          </div>
                        </div>
                        <div>Episode {scrobble.episode}</div>
                        <div className="flex">
                          <small className="text-gray-600 my-auto mr-2">
                            {new Date(scrobble.updatedAt).toLocaleString()}
                          </small>
                          <FiMoreVertical className="my-auto hover:text-gray-600 text-lg cursor-pointer" />
                        </div>
                      </div>
                      {/* <Flex>
                        <Heading as="h5">{scrobble.providerMediaId}</Heading>
                        <Progress
                          w="full"
                          my="auto"
                          mx="4"
                          value={100 / scrobble.episode}
                        />
                        <Button
                          my="auto"
                          px="10"
                          as="a"
                          href={`https://anilist.co/anime/${scrobble.providerMediaId}`}
                          target="_blank"
                          size="sm"
                        >
                          View on AniList
                        </Button>
                      </Flex> */}
                    </SelectableCard>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}
      </Box>
    </Center>
  );
};

export default Dashboard;
