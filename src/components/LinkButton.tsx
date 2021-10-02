import React from 'react';

import Link from 'next/link';

export interface LinkButtonProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

export const LinkButton = ({
  href,
  icon,
  text,
  active,
}: LinkButtonProps): JSX.Element => {
  return (
    <Link passHref href={href}>
      <a
        className={`px-3 relative flex items-center py-2 rounded-md  hover:bg-gray-100 space-x-4 hover:text-foreground focus-visible:ring-pink-700 focus-visible:ring-2 focus-visible:outline-none ${
          active ? "text-foreground" : "text-gray-500"
        }`}
      >
        {icon}
        <p>{text}</p>
      </a>
    </Link>
  );
};
