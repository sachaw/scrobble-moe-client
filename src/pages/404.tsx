import React from "react";

import { Button } from "components/Button";
import Image from "next/image";
import Link from "next/link";

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
          <Link href="/dashboard" passHref>
            <Button>Dashboard</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page404;
