import React from 'react';

import { AnilistSearch } from 'components/AnilistSearch';
import { Button, LinkButton } from 'components/Button';
import { Card, CardLoading } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Input';
import { Select } from 'components/Select';
import { FeedFilter } from 'components/subscriptions/FeedFilter';
import { TabLayout } from 'components/TabLayout';
import {
  ADD_SERIES_SUBSCRIPTION,
  IAddSeriesSubscriptionInput,
  IAddSeriesSubscriptionVariables,
} from 'graphql/mutations/addSeriesSubscription';
import {
  ENCODERS,
  IEncoder,
  IEncodersResponse,
  IEncodersVariables,
} from 'graphql/queries/encoders';
import { ISeriesSubscription } from 'graphql/queries/seriesSubscriptions';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FiCornerDownLeft, FiDelete, FiPlus } from 'react-icons/fi';
import { useMutation, useQuery } from 'urql';

const NewSubscription = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,

    formState: { errors },
  } = useForm<IAddSeriesSubscriptionInput>();
  const router = useRouter();
  const [encoders, refetchEncoders] = useQuery<
    IEncodersResponse,
    IEncodersVariables
  >({
    query: ENCODERS,
    variables: {
      Input: {},
    },
  });
  const [seriesSubscription, AddSeriesSubscription] = useMutation<
    ISeriesSubscription,
    IAddSeriesSubscriptionVariables
  >(ADD_SERIES_SUBSCRIPTION);

  const onSubmit = handleSubmit((data) => {
    void AddSeriesSubscription({
      Input: {
        nameIncludes: data.nameIncludes,
        nameExcludes: data.nameExcludes,
        episodeOffset: data.episodeOffset,
        providerMediaId: data.providerMediaId,
        encoderId: data.encoderId,
      },
    }).then(() => {
      void router.push("/subscriptions");
    });
  });
  return (
    <Card title="Add Series Subscription">
      <TabLayout
        actions={
          <>
            <LinkButton
              nested
              href="/subscriptions"
              rightIcon={<FiCornerDownLeft />}
            >
              Back
            </LinkButton>
            <IconButton
              icon={<FiDelete />}
              onClick={(): void => {
                reset();
              }}
            />
          </>
        }
      >
        {seriesSubscription.fetching && encoders.fetching && <CardLoading />}
        {!seriesSubscription.fetching && !encoders.fetching && encoders.data && (
          <form
            autoComplete="off"
            className="flex flex-col space-y-4"
            onSubmit={onSubmit}
          >
            <Select
              title="Encoder"
              options={encoders.data.encoders.map((encoder) => ({
                name: encoder.name,
                value: encoder.id,
              }))}
              {...register("encoderId", { required: true })}
            />
            <AnilistSearch
              setId={(id: number): void => {
                setValue("providerMediaId", id.toString());
              }}
              error={errors.providerMediaId?.message}
              {...register("providerMediaId", { required: true })}
            />
            <Input
              title="Name Includes"
              error={errors.nameIncludes?.message}
              {...register("nameIncludes", { required: true })}
            />
            <Input
              title="Name Excludes"
              error={errors.nameExcludes?.message}
              {...(register("nameExcludes"), { required: false })}
            />
            <Input
              title="Episode Offset"
              error={errors.episodeOffset?.message}
              type="number"
              defaultValue={0}
              {...register("episodeOffset", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <FeedFilter
              encoderId={watch("encoderId")}
              includes={watch("nameIncludes")}
              excludes={watch("nameExcludes")}
              matchRegex={
                (
                  encoders.data.encoders.find(
                    (encoder) => encoder.id === watch("encoderId")
                  ) as IEncoder
                )?.matchRegex
              }
              episodeOffset={watch("episodeOffset")}
            />
            <div className="ml-auto mr-4 md:mr-0">
              <Button type="submit" nested rightIcon={<FiPlus />}>
                Add Subscription
              </Button>
            </div>
          </form>
        )}
      </TabLayout>
    </Card>
  );
};

export default NewSubscription;
