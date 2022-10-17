import React from 'react';

import { GraphQLClient } from 'graphql-request';
import {
  ANILIST_SEARCH,
  IAniListAnime,
  IAniListSearchVariabled,
  IIAniListSearchResponse,
  IStatusEnum,
} from 'graphql/queries/anilist_search';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from 'react-use';

import { IconButton } from './IconButton';
import { Input } from './Input';

export interface AnilistSearchProps {
  error?: string;
  setId: (id: number) => void;
}

export const AnilistSearch = React.forwardRef<
  HTMLInputElement,
  AnilistSearchProps
>(({ error, setId, ...props }, ref): JSX.Element => {
  const client = new GraphQLClient("https://graphql.anilist.co/");
  const { register, watch } = useForm<{ search: string }>();

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
      setSearchPhrase(value.search ?? "");
      setSelectedAnime(undefined);
      setLoading(true);
    });
    return (): void => subscription.unsubscribe();
  }, [watch]);

  useDebounce(handleSearch, 500, [searchPhrase]);

  return (
    <>
      <input ref={ref} className="hidden" {...props} />
      <div className="flex flex-col h-full space-y-1">
        <Input
          title="AniList ID"
          action={<IconButton icon={<FiSearch />} />}
          placeholder="AniList ID or name"
          error={error}
          {...register("search", { required: true })}
        />
        <div className="border-gray-200 border-y md:border md:rounded-md">
          {selectedAnime && (
            <div className="flex p-2">
              <Image
		alt="Cover Image"
                className="rounded-md"
                src={selectedAnime.coverImage.extraLarge}
                height={120}
                width={80}
              />
              <div className="flex flex-col w-full pl-2">
                <div className="flex justify-between">
                  <div className="font-semibold">
                    <div className="flex truncate">
                      {selectedAnime.title.romaji}{" "}
                      <div
                        className={`min-w-[3] w-3 h-3 my-auto mx-2 rounded-full ${
                          selectedAnime.status === IStatusEnum.RELEASING
                            ? "bg-green-500"
                            : selectedAnime.status === IStatusEnum.FINISHED
                            ? "bg-pink-500"
                            : selectedAnime.status === IStatusEnum.CANCELLED
                            ? "bg-red-500"
                            : selectedAnime.status === IStatusEnum.HIATUS
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      />
                    </div>
                    <div className="flex text-sm font-bold text-gray-600">
                      <div className="font-light">
                        {selectedAnime.episodes} Episodes -&nbsp;
                      </div>
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
                    <div className="font-semibold truncate">
                      {anime.title.romaji}
                    </div>
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
});
