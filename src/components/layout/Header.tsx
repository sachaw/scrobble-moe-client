import React from 'react';

import Link from 'next/link';

import { LoginButton } from './LoginButton';

export const Header = (): JSX.Element => {
  return (
    <div className="flex px-8 py-6">
      <div className="text-xl font-bold">
        <Link href="/">scrobble.moe</Link>
      </div>

      <div className="ml-auto">
        <LoginButton />
      </div>
    </div>
  );
};
