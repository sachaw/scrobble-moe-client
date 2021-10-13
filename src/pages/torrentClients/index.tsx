import React from 'react';

import { Card } from 'components/Card';
import { TorrentClientsGroup } from 'components/TorrentClients/TorrentClientsGroup';

const TorrentClients = (): JSX.Element => {
  return (
    <Card title="Torrent Clients">
      <TorrentClientsGroup />
    </Card>
  );
};

export default TorrentClients;
