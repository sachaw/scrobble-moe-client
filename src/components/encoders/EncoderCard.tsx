import React from 'react';

import { IconButton } from 'components/IconButton';
import { SelectableCard } from 'components/SelectableCard';
import { IEncoder } from 'graphql/queries/encoders.js';
import { useRouter } from 'next/router';
import { FiTrash } from 'react-icons/fi';

export interface EncoderCardProps {
  encoder: IEncoder;
}

export const EncoderCard = ({ encoder }: EncoderCardProps): JSX.Element => {
  const router = useRouter();
  return (
    <SelectableCard
      onClick={(): void => {
        void router.push(`/encoders/${encoder.id}`);
      }}
      className="cursor-pointer select-none"
      updatedAt={encoder.updatedAt}
      actions={
        <IconButton
          confirmAction={() => console.log("deleted")}
          icon={<FiTrash />}
        />
      }
    >
      <div className="flex justify-between w-full">
        <div className="my-auto text-sm font-semibold">{encoder.name}</div>
      </div>
    </SelectableCard>
  );
};
