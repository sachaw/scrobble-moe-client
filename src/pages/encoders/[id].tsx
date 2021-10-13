import React from 'react';

import { Card } from 'components/Card';
import { EncoderGroup } from 'components/encoders/EncoderGroup';
import { useRouter } from 'next/router';

const Subscription = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Card title="Encoder">
      <EncoderGroup id={id as string} />
    </Card>
  );
};

export default Subscription;
