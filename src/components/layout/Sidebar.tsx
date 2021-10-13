import React from 'react';

import { NavButton } from 'components/NavButton';
import {
  FiActivity,
  FiDatabase,
  FiKey,
  FiLayout,
  FiRss,
  FiVideo,
} from 'react-icons/fi';

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-52 min-w-[13rem] pt-4 top-4 sticky space-y-2">
      <NavButton href="/dashboard" icon={<FiActivity />} text="Dashboard" />
      <NavButton href="/credentials" icon={<FiKey />} text="Credentials" />
      <NavButton
        href="/torrentClients"
        icon={<FiDatabase />}
        text="Torrent Clients"
      />
      <NavButton href="/encoders" icon={<FiVideo />} text="Encoders" />
      <NavButton href="/subscriptions" icon={<FiRss />} text="Subscriptions" />
      <NavButton href="/admin" icon={<FiLayout />} text="Admin" />
    </aside>
  );
};
