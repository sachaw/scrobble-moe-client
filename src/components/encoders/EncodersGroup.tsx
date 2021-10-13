import React from 'react';

import { CardLoading, CardNoInfo } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { TabLayout } from 'components/TabLayout';
import {
  ENCODERS,
  IEncodersResponse,
  IEncodersVariables,
} from 'graphql/queries/encoders';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'urql';

import { LinkButton } from '../Button';
import { EncoderCard } from './EncoderCard';

export const EncodersGroup = (): JSX.Element => {
  const [encoders, refetchEncoders] = useQuery<
    IEncodersResponse,
    IEncodersVariables
  >({
    query: ENCODERS,
    variables: {
      Input: {},
    },
  });

  return (
    <TabLayout
      actions={
        <>
          <LinkButton href="/encoders/new" nested rightIcon={<FiPlus />}>
            Add Encoder
          </LinkButton>
          <IconButton
            onClick={(): void => {
              refetchEncoders({
                requestPolicy: "network-only",
              });
            }}
            icon={
              <FiRefreshCw
                className={encoders.fetching ? "animate-spin" : ""}
              />
            }
          />
        </>
      }
    >
      <div className="flex flex-col h-full">
        {encoders.fetching && <CardLoading />}
        {encoders.data && !encoders.fetching && (
          <div className="space-y-2">
            {encoders.data.encoders.map((encoder) => (
              <EncoderCard key={encoder.id} encoder={encoder} />
            ))}
          </div>
        )}
        {encoders.data?.encoders.length === 0 && (
          <CardNoInfo message="No Encoders" />
        )}
      </div>
    </TabLayout>
  );
};
