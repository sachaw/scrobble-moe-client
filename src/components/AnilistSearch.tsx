import React from 'react';

import { GraphQLClient } from 'graphql-request';
import {
  ANILIST_SEARCH,
  IAniListAnime,
  IAniListSearchVariabled,
  IIAniListSearchResponse,
} from 'graphql/queries/anilist_search';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from 'react-use';

import { IconButton } from './IconButton';
import { Input } from './Input';

export interface AnilistSearchProps {
  setId: (id: number) => void;
}

export const AnilistSearch = ({ setId }: AnilistSearchProps): JSX.Element => {
  const client = new GraphQLClient("https://graphql.anilist.co/");
  const { register, watch, handleSubmit } = useForm<{ search: string }>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const [selectedAnime, setSelectedAnime] = React.useState<IAniListAnime>();
  const [animeOptions, setAnimeOptions] = React.useState<IAniListAnime[]>([]);
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async (): Promise<void> => {
    if (searchPhrase.length > 0) {
      const rawData = await client.request<
        IIAniListSearchResponse,
        IAniListSearchVariabled
      >(ANILIST_SEARCH, {
        id: Number(searchPhrase) ? parseInt(searchPhrase) : undefined,
        search: Number(searchPhrase) ? undefined : searchPhrase,
      });

      setLoading(false);

      if (rawData.anime.results.length === 1) {
        setSelectedAnime(rawData.anime.results[0]);
        setId(rawData.anime.results[0].id);
      } else if (rawData.anime.results.length > 1) {
        setAnimeOptions(rawData.anime.results);
        setSelectedAnime(undefined);
      }
    }
  };

  React.useEffect(() => {
    const subscription = watch((value) => {
      setSearchPhrase(value.search);
      setLoading(true);
    });
    return (): void => subscription.unsubscribe();
  }, [watch]);

  useDebounce(handleSearch, 1000, [searchPhrase]);

  return (
    <>
      <input className="hidden" />
      <div className="flex flex-col h-full !mt-0 space-y-1">
        <Input
          title="AniList ID"
          action={<IconButton icon={<FiSearch />} />}
          placeholder="AniList ID or name"
          {...register("search", { required: true })}
        />
        <div className="border border-gray-200 rounded-md">
          {selectedAnime && (
            <div className="flex p-2">
              <Image
                className="rounded-md"
                src={selectedAnime.coverImage.extraLarge}
                height={120}
                width={80}
              />
              <div className="flex flex-col w-full pl-2">
                <div className="flex justify-between">
                  <div className="font-semibold">
                    {selectedAnime.title.romaji}
                    <div className="text-sm font-bold text-gray-600">
                      {selectedAnime.startDate.year}
                    </div>
                  </div>
                  <div className="mb-auto">
                    <IconButton
                      onClick={(): void => setSelectedAnime(undefined)}
                      icon={<FiX />}
                    />
                  </div>
                </div>
                <div className="max-w-xs m-auto font-light text-center text-gray-600 line-clamp-2">
                  {selectedAnime.description}
                </div>
              </div>
            </div>
          )}
          {!loading &&
            !selectedAnime &&
            animeOptions &&
            animeOptions.length > 0 && (
              <div className="flex flex-col">
                {animeOptions.map((anime) => (
                  <div
                    key={anime.id}
                    className="flex justify-between px-2 py-1 m-1 border border-gray-200 rounded-md cursor-pointer hover:border-gray-400"
                    onClick={(): void => {
                      setSelectedAnime(anime);
                      setId(anime.id);
                    }}
                  >
                    <div className="font-semibold">{anime.title.romaji}</div>
                    <div className="text-sm font-bold text-gray-600">
                      {anime.startDate.year}
                    </div>
                  </div>
                ))}
              </div>
            )}
          {!loading && !selectedAnime && animeOptions.length === 0 && (
            <div className="flex flex-col items-center justify-center p-4 text-xl">
              No Anime Selected
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center p-4 text-xl">
              Loading...
            </div>
          )}
        </div>
      </div>
    </>
  );
};
