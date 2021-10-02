import React from 'react';

import { LinkButton } from 'components/LinkButton';
import { FiCloud } from 'react-icons/fi';

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-52 min-w-[13rem] pt-4 top-4 sticky space-y-2">
      <LinkButton active href="/dashboard" icon={<FiCloud />} text="Button" />
      <LinkButton href="/dashboard" icon={<FiCloud />} text="Button" />
      <LinkButton href="/dashboard" icon={<FiCloud />} text="Button" />
      <LinkButton href="/dashboard" icon={<FiCloud />} text="Button" />
    </aside>
  );
};
