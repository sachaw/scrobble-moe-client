import React from 'react';

import Link from 'next/link';
import { FiActivity } from 'react-icons/fi';

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex p-4">
      <div className="flex space-x-4 text-md">
        <Link passHref href="https://scrobble.moe">
          <div className="cursor-pointer hover:underline">
            {new Date().getFullYear()} - scrobble.moe
          </div>
        </Link>
        <Link passHref href="https://status.scrobble.moe">
          <div className="flex cursor-pointer hover:underline">
            <FiActivity className="my-auto mr-1" />
            Status
          </div>
        </Link>
      </div>
    </footer>
  );
};
