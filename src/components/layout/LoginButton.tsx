import React from "react";

import { AUTH_CHECK, IAuthCheckResponse } from "graphql/queries/authCheck";
import Link from "next/link";
import { FiHome, FiLoader, FiLogIn } from "react-icons/fi";
import { useQuery } from "urql";

export const LoginButton = (): JSX.Element => {
  const [authCheck, refetchAuthCheck] = useQuery<IAuthCheckResponse>({
    query: AUTH_CHECK,
  });

  if (authCheck.fetching) {
    return (
      <div className="p-4 text-gray-600 bg-gray-100 rounded-full cursor-default">
        <FiLoader className="animate-spin" />
      </div>
    );
  }

  return authCheck.data?.authCheck.authenticated ? (
    <Link passHref href="/dashboard">
      <div className="p-3 rounded-md cursor-pointer hover:bg-gray-100 active:scale-95">
        <FiHome />
      </div>
    </Link>
  ) : (
    <Link passHref href="/auth">
      <div className="p-3 rounded-md cursor-pointer hover:bg-gray-100 active:scale-95">
        <FiLogIn />
      </div>
    </Link>
  );
};
