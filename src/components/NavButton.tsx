import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavButtonProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

export const NavButton = ({
  href,
  icon,
  text,
}: NavButtonProps): JSX.Element => {
  const router = useRouter();
  return (
    <Link passHref href={href}>
      <a
        className={`px-3 relative flex items-center py-2 rounded-md  hover:bg-gray-100 space-x-4 hover:text-foreground focus-visible:ring-pink-700 focus-visible:ring-2 focus-visible:outline-none ${
          router.asPath === href ? "text-foreground" : "text-gray-500"
        }`}
      >
        {icon}
        <p>{text}</p>
      </a>
    </Link>
  );
};
