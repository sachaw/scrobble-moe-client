import React from "react";

import { NavButton } from "components/NavButton";
import { FiActivity, FiKey, FiLayout } from "react-icons/fi";

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-52 min-w-[13rem] pt-4 top-4 sticky space-y-2">
      <NavButton href="/dashboard" icon={<FiActivity />} text="Dashboard" />
      <NavButton href="/credentials" icon={<FiKey />} text="Credentials" />
      <NavButton href="/admin" icon={<FiLayout />} text="Admin" />
    </aside>
  );
};
