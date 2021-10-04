import React from 'react';

import { LinkButton } from 'components/LinkButton';
import { FiActivity, FiDatabase, FiKey, FiLayout, FiRss } from 'react-icons/fi';

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-52 min-w-[13rem] pt-4 top-4 sticky space-y-2">
      <LinkButton href="/dashboard" icon={<FiActivity />} text="Dashboard" />
      <LinkButton href="/credentials" icon={<FiKey />} text="Credentials" />
      <LinkButton
        href="/torrentClients"
        icon={<FiDatabase />}
        text="Torrent Clients"
      />
      <LinkButton href="/subscriptions" icon={<FiRss />} text="Subscriptions" />
      <LinkButton href="/admin" icon={<FiLayout />} text="Admin" />
    </aside>
  );
};
