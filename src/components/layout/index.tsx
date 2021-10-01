import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="flex  flex-col h-screen w-screen bg-background">
      <Header />
      <div className="md:flex flex-grow">
        <div className="mx-8 md:ml-auto md:w-44">
          <Sidebar />
        </div>
        <div className="container mr-auto max-w-3xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
