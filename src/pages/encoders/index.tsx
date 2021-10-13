import React from 'react';

import { Card } from 'components/Card';
import { EncodersGroup } from 'components/encoders/EncodersGroup';

const Encoders = (): JSX.Element => {
  return (
    <Card title="Encoders">
      <EncodersGroup />
    </Card>
  );
};

export default Encoders;
