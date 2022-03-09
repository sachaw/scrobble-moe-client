import React from 'react';

import { Card } from 'components/Card';
import { TorrentClientGroup } from 'components/TorrentClient/TorrentClientGroup';

const TorrentClient = (): JSX.Element => {
  return (
    <Card title="Torrent Client">
      <TorrentClientGroup />
    </Card>
  );
};

export default TorrentClient;
