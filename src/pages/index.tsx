import React from "react";

import {
  ILatestScrobblesResponse,
  LATEST_SCROBBLES,
} from "graphql/queries/latestScrobbles";
import { useQuery } from "urql";

const Home = (): JSX.Element => {
  const [latestScrobbles, refetchLatestScrobbles] =
    useQuery<ILatestScrobblesResponse>({
      query: LATEST_SCROBBLES,
    });

  return (
    <div className="mt-52">
      <h1 className="text-3xl font-semibold">
        Automatic Plex tracking for{" "}
        <a
          className="text-5xl font-bold text-pink-400 underline"
          href="https://anilist.co/"
        >
          AniList
        </a>{" "}
        &{" "}
        <a
          className="text-5xl font-bold text-pink-400 underline"
          href="https://kitsu.io/"
        >
          Kitsu
        </a>
      </h1>
      {/* {useBreakpointValue({
        base: (
          <Card title="temp">
            <Heading size="md">
              Automatically scrobble plex watches to the providers of your
              choice
            </Heading>
          </Card>
        ),
        sm: (
          <Box
            backgroundImage="/lines.svg"
            backgroundSize="contain"
            backgroundPosition="right"
            backgroundRepeat="no-repeat"
            backgroundColor="rgba(175, 0, 219, 0.1)"
            height="28rem"
          >
            <Flex h="full">
              <Box ml="6rem" my="auto">
                <Image
                  src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx138060-LhXZldzhh5dP.jpg"
                  top="8rem"
                  left="6rem"
                  zIndex="2"
                  position="absolute"
                  h="12rem"
                  rounded="lg"
                  transition="transform .2s"
                  _hover={{ transform: "scale(1.1)", zIndex: "10" }}
                />
                <Image
                  src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx129874-R5sdioCVMKwe.png"
                  position="absolute"
                  top="12rem"
                  left="9rem"
                  zIndex="3"
                  h="12rem"
                  rounded="lg"
                  transition="transform .2s"
                  _hover={{ transform: "scale(1.1)", zIndex: "10" }}
                />
                <Image
                  src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx116742-jn0dW23ftehq.jpg"
                  position="absolute"
                  top="16rem"
                  left="12rem"
                  zIndex="4"
                  h="12rem"
                  rounded="lg"
                  transition="transform .2s"
                  _hover={{ transform: "scale(1.1)", zIndex: "10" }}
                />
                <Image
                  src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx126047-C3ivEjzfigA0.jpg"
                  position="absolute"
                  top="10rem"
                  left="12em"
                  zIndex="1"
                  h="12rem"
                  rounded="lg"
                  transition="transform .2s"
                  _hover={{ transform: "scale(1.1)", zIndex: "10" }}
                />
                <Image
                  src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx133965-1jyaEkgXQW8a.jpg"
                  position="absolute"
                  top="14rem"
                  left="15rem"
                  zIndex="1"
                  h="12rem"
                  rounded="lg"
                  transition="transform .2s"
                  _hover={{ transform: "scale(1.1)", zIndex: "10" }}
                />

                <Image
                  src="/anilist.svg"
                  position="absolute"
                  top="16rem"
                  left="35rem"
                  h="8rem"
                  rounded="lg"
                  transition="transform .2s"
                  _hover={{ transform: "scale(1.1)", zIndex: "10" }}
                />
                <Image
                  src="/kitsu.svg"
                  position="absolute"
                  top="16rem"
                  left="50rem"
                  h="8rem"
                  rounded="lg"
                  transition="transform .2s"
                  _hover={{ transform: "scale(1.1)", zIndex: "10" }}
                />
              </Box>
            </Flex>
          </Box>
        ),
      })} */}

      {/* <Box m="8">
        <Center>
          <Flex
            w="full"
            direction={useBreakpointValue({
              base: "column",
              sm: "row",
            })}
            experimental_spaceX={useBreakpointValue({
              base: "0",
              sm: "8",
            })}
            maxW="1400"
          >
            <Box w="full">
              <Heading size="lg" mb="1rem">
                Recent scrobbles
              </Heading>
              <Box experimental_spaceY="1rem">
                {latestScrobbles.fetching && (
                  <Box w="full" bgColor="gray.100" rounded="lg">
                    <Flex h="full">
                      <Skeleton roundedLeft="lg" h="6rem" w="5rem" />
                      <Skeleton rounded="lg" h="auto" w="full" m="2" />
                    </Flex>
                  </Box>
                )}
                {latestScrobbles.data &&
                  latestScrobbles.data.latestScrobbles.map(
                    (scrobble, index) => (
                      <Card key={index} title="temp">
                        <Flex>
                          <Image
                            src={scrobble.anilistData.coverImage}
                            roundedLeft="lg"
                            h="6rem"
                          />
                          <Flex>
                            <Image
                              src={scrobble.user.thumb}
                              rounded="full"
                              h="3rem"
                              my="auto"
                              mx="1rem"
                            />
                          </Flex>
                          <Box w="full" mx="1rem">
                            <Heading
                              size="md"
                              my="0.5rem"
                              whiteSpace="nowrap"
                              textOverflow="ellipsis"
                              overflow="hidden"
                            >
                              {scrobble.anilistData.title}
                            </Heading>
                            <Progress
                              colorScheme="purple"
                              rounded="lg"
                              height="32px"
                              w="full"
                              value={Math.floor(
                                (scrobble.endEpisode /
                                  scrobble.anilistData.episodes) *
                                  100
                              )}
                            />
                            {scrobble.endEpisode} /{" "}
                            {scrobble.anilistData.episodes} ={" "}
                            {Math.floor(
                              (scrobble.endEpisode /
                                scrobble.anilistData.episodes) *
                                100
                            )}
                            %
                          </Box>
                        </Flex>
                      </Card>
                    )
                  )}
              </Box>
            </Box>
            <Box w="full">
              <Heading size="lg" mb="1rem">
                Popular scrobbles
              </Heading>
              <Box>
                <Box w="full" backgroundColor="gray.500" rounded="lg">
                  <Image
                    src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx125446-EXB91ho7ffCn.jpg"
                    roundedLeft="lg"
                    h="6rem"
                  />
                </Box>
              </Box>
            </Box>
          </Flex>
        </Center>
      </Box>
    </Box> */}
    </div>
  );
};

export default Home;
