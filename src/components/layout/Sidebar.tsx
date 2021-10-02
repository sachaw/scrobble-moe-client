import React from "react";

import { LinkButton } from "components/LinkButton";
import { FiActivity, FiDatabase, FiKey, FiRss } from "react-icons/fi";

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-52 min-w-[13rem] pt-4 top-4 sticky space-y-2">
      <LinkButton
        active
        href="/dashboard"
        icon={<FiActivity />}
        text="Dashboard"
      />
      <LinkButton href="/dashboard" icon={<FiKey />} text="Credentials" />
      <LinkButton href="/dashboard" icon={<FiDatabase />} text="Torrents" />
      <LinkButton href="/dashboard" icon={<FiRss />} text="Subscriptions" />
    </aside>
  );
};
