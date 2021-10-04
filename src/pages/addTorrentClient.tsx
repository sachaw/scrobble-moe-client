import React from 'react';

import { Button, LinkButton } from 'components/Button';
import { Card, CardLoading } from 'components/Card';
import { Input } from 'components/Input';
import { TabLayout } from 'components/TabLayout';
import {
  ADD_TORRENT_CLIENT,
  IAddTorrentClientInput,
  IAddTorrentClientVariables,
} from 'graphql/mutations/addTorrentClient';
import { ITorrentClient } from 'graphql/queries/torrentClients';
import { useForm } from 'react-hook-form';
import { FiCornerDownLeft, FiPlus } from 'react-icons/fi';
import { useMutation } from 'urql';

const AddTorrentClient = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddTorrentClientInput>();

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
        client: data.client,
      },
    });
  });

  return (
    <Card title="Add Torrent Client">
      <TabLayout
        actions={
          <LinkButton nested href="/dashboard" rightIcon={<FiCornerDownLeft />}>
            Back
          </LinkButton>
        }
      >
        {torrentClient.fetching && <CardLoading />}
        {!torrentClient.fetching && (
          <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
            clientUrl
            <Input {...register("clientUrl", { required: true })} />
            clientUsername
            <Input {...register("clientUsername", { required: true })} />
            clientPassword
            <Input
              type="password"
              {...register("clientPassword", { required: true })}
            />
            client
            <Input {...register("client", { required: true })} />
            {errors.client && <span>This field is required</span>}
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

export default AddTorrentClient;
