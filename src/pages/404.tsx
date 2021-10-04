import React from 'react';

import { LinkButton } from 'components/Button';
import Image from 'next/image';

const Page404 = (): JSX.Element => {
  return (
    <>
      <Image
        src="/404.png"
        height="512"
        width="512"
        alt="Error 404 not found Illustration"
      />

      <div>
        <div>Page not Found.</div>

        <div>
          <LinkButton href="dashboard">Dashboard</LinkButton>
        </div>
      </div>
    </>
  );
};

export default Page404;
