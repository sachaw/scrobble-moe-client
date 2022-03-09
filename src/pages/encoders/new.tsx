import React from 'react';

import { Button, LinkButton } from 'components/Button';
import { Card, CardLoading } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Input';
import { TabLayout } from 'components/TabLayout';
import {
  ADD_ENCODER,
  IAddEncoderInput,
  IAddEncoderVariables,
} from 'graphql/mutations/addEncoder';
import { IEncoder } from 'graphql/queries/encoders';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FiCornerDownLeft, FiDelete, FiPlus } from 'react-icons/fi';
import { useMutation } from 'urql';

const NewEncoder = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddEncoderInput>();
  const router = useRouter();
  const [encoder, addEncoder] = useMutation<IEncoder, IAddEncoderVariables>(
    ADD_ENCODER
  );

  const onSubmit = handleSubmit((data) => {
    void addEncoder({
      Input: {
        name: data.name,
        rssURL: data.rssURL,
        matchRegex: data.matchRegex,
      },
    }).then(() => {
      void router.push("/encoders");
    });
  });
  return (
    <Card title="Add Encoder">
      <TabLayout
        actions={
          <>
            <LinkButton
              nested
              href="/encoders"
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
        {encoder.fetching && <CardLoading />}
        {!encoder.fetching && (
          <form
            autoComplete="off"
            className="flex flex-col space-y-4"
            onSubmit={onSubmit}
          >
            <Input
              title="Name"
              error={errors.name?.message}
              {...register("name", { required: true })}
            />
            <Input
              title="RSS URL"
              error={errors.rssURL?.message}
              {...register("rssURL", { required: true })}
            />
            <Input
              title="Match Regex"
              error={errors.matchRegex?.message}
              {...register("matchRegex", { required: true })}
            />
            <div className="-mt-2 text-xs font-medium text-gray-500">
              Regex should match from start of string, and include named capture
              groups for{" "}
              <code className="bg-gray-100 py-1 px-2 rounded-full">name</code>,{" "}
              <code className="bg-gray-100 py-1 px-2 rounded-full">
                episode
              </code>
              , and optionally{" "}
              <code className="bg-gray-100 py-1 px-2 rounded-full">season</code>
              . i.e.{" "}
              <code className="bg-gray-100 py-1 px-2 rounded-full">
                ^\[ASW\] (?&lt;name&gt;.*) - (?&lt;episode&gt;\d+)
              </code>
            </div>

            <div className="ml-auto">
              <Button type="submit" nested rightIcon={<FiPlus />}>
                Add Encoder
              </Button>
            </div>
          </form>
        )}
      </TabLayout>
    </Card>
  );
};

export default NewEncoder;
