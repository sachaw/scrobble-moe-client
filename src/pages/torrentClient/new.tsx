import React from 'react';

import { Button, LinkButton } from 'components/Button';
import { Card, CardLoading } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Input';
import { TabLayout } from 'components/TabLayout';
import {
  ADD_TORRENT_CLIENT,
  IAddTorrentClientInput,
  IAddTorrentClientVariables,
} from 'graphql/mutations/addTorrentClient';
import { ITorrentClient } from 'graphql/queries/torrentClient';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FiCornerDownLeft, FiDelete, FiPlus } from 'react-icons/fi';
import { useMutation } from 'urql';

const NewTorrentClient = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddTorrentClientInput>();
  const router = useRouter();
  const [torrentClient, AddTorrentClient] = useMutation<
    ITorrentClient,
    IAddTorrentClientVariables
  >(ADD_TORRENT_CLIENT);

  const onSubmit = handleSubmit((data) => {
    void AddTorrentClient({
      Input: {
        clientUrl: data.clientUrl,
        clientUsername: data.clientUsername,
        clientPassword: data.clientPassword,
      },
    }).then(() => {
      void router.push("/torrentClient");
    });
  });

  return (
    <Card title="Add Torrent Client">
      <TabLayout
        actions={
          <>
            <LinkButton
              nested
              href="/torrentClient"
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
        {torrentClient.fetching && <CardLoading />}
        {!torrentClient.fetching && (
          <form
            autoComplete="off"
            className="flex flex-col space-y-4"
            onSubmit={onSubmit}
          >
            <Input
              title="Client URL"
              error={errors.clientUrl?.message}
              {...register("clientUrl", { required: true })}
            />
            <Input
              title="Username"
              error={errors.clientUsername?.message}
              {...register("clientUsername", { required: true })}
            />
            <Input
              title="Password"
              error={errors.clientPassword?.message}
              type="password"
              {...register("clientPassword", { required: true })}
            />
            <div className="ml-auto">
              <Button type="submit" nested rightIcon={<FiPlus />}>
                Add Client
              </Button>
            </div>
          </form>
        )}
      </TabLayout>
    </Card>
  );
};

export default NewTorrentClient;
