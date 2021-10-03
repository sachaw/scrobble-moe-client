import React from 'react';

import { Card } from 'components/Card';
import { SeriesSubscriptionsGroup } from 'components/subscriptions/SeriesSubscriptionsGroup';

const Subscriptions = (): JSX.Element => {
  return (
    <Card title="Subscriptions">
      <SeriesSubscriptionsGroup />
    </Card>
  );
};

export default Subscriptions;
