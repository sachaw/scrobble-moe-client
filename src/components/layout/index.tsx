import React from "react";

import { useRouter } from "next/router";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-screen h-screen px-5 text-foreground bg-background">
      <Header />
      <div className="flex-grow w-full max-w-screen-xl mx-auto md:flex md:space-x-4">
        {["/", "/auth", "/auth/callback"].includes(router.pathname) ? (
          <div className="container max-w-3xl mx-auto">{children}</div>
        ) : (
          <>
            <Sidebar />
            <div className="container max-w-3xl mr-auto">{children}</div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
