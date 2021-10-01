import React from 'react';

import { FiCloud } from 'react-icons/fi';

export const Sidebar = (): JSX.Element => {
  return (
    <div className="space-y-2">
      <div className="hover:bg-gray-100 rounded-md cursor-pointer select-none flex py-2 px-4 text-lg space-x-4">
        <FiCloud className="my-auto" />
        <div>Button</div>
      </div>
      <div className="hover:bg-gray-100 rounded-md cursor-pointer select-none flex py-2 px-4 text-lg space-x-4">
        <FiCloud className="my-auto" />
        <div>Button</div>
      </div>
    </div>
  );
};
