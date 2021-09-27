import React from 'react';

import Image from 'next/image';

import { Box, Tooltip } from '@chakra-ui/react';

type HelperImageProps = {
  label?: string;
  src: string;
};

export const HelperImage = ({ label, src }: HelperImageProps): JSX.Element => {
  return (
    <Tooltip hasArrow aria-label={label} label={label} placement="auto-end">
      <Box marginX={2}>
        <Image src={src} alt={label} title={label} height={33} width={33} />
      </Box>
    </Tooltip>
  );
};
