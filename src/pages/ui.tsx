import React from 'react';

import { Card } from 'components/Card';
import { SelectableCard } from 'components/SelectableCard';

const tabs = [
  {
    title: "General",
    component: <div>General</div>,
  },
  {
    title: "Environments",
    component: <div>Environments</div>,
  },
];

const UI = (): JSX.Element => {
  return (
    <div className="p-36 bg-background">
      <Card title="Sample Content">
        Empty Card
        <SelectableCard status="fail" />
      </Card>
      <Card title="Settings" tabs={tabs} />
    </div>
  );
};

export default UI;
