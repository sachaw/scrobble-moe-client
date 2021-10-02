import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="flex text-foreground flex-col h-screen w-screen px-5 bg-background">
      <Header />
      <div className="md:flex flex-grow max-w-screen-xl mx-auto w-full md:space-x-4">
        <Sidebar />
        <div className="container mr-auto max-w-3xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
