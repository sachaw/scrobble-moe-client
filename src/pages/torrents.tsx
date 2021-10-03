import React from 'react';

import { Card } from 'components/Card';
import { TorrentClientsGroup } from 'components/torrents/TorrentClientsGroup';

const Torrents = (): JSX.Element => {
  return (
    <Card title="Torrents">
      <TorrentClientsGroup />
    </Card>
  );
};

export default Torrents;
