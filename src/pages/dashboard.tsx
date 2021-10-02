import React from "react";

import { Card } from "components/Card";
import { OverviewGroup } from "components/dashboard/groups/OverviewGroup";
import { ScrobblesGroup } from "components/dashboard/groups/ScrobblesGroup";
import { ServersGroup } from "components/dashboard/groups/ServersGroup";
import { SettingsGroup } from "components/dashboard/groups/SettingsGroup";

const Dashboard = (): JSX.Element => {
  return (
    <Card
      title="Dashboard"
      tabs={[
        {
          title: "Overview",
          component: OverviewGroup,
        },
        {
          title: "Scrobbles",
          component: ScrobblesGroup,
        },
        {
          title: "Servers",
          component: ServersGroup,
        },
        {
          title: "Settings",
          component: SettingsGroup,
        },
      ]}
    />
  );
};

export default Dashboard;
