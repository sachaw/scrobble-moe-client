import React from 'react';

import Link from 'next/link';

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex p-4">
      <div className="text-md">
        {new Date().getFullYear()} -{" "}
        <Link href="https://scrobble.moe">scrobble.moe</Link>
      </div>
    </footer>
  );
};
