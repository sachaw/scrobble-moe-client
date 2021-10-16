import React from 'react';

import { Card } from 'components/Card';
import { TabLayout } from 'components/TabLayout';
import Image from 'next/image';

const AdminCard = ({
  image,
  href,
  title,
}: {
  image: string;
  href: string;
  title: string;
}): JSX.Element => {
  return (
    <a
      title={title}
      href={href}
      className="flex min-w-[10rem] m-2 w-40 h-40 bg-gray-100 rounded-lg cursor-pointer hover:scale-95"
    >
      <div className="m-auto">
        <Image src={image} width={100} height={100} />
      </div>
    </a>
  );
};

const Admin = (): JSX.Element => {
  return (
    <Card title="Admin">
      <TabLayout>
        <div className="flex mx-auto justify-between max-w-2xl">
          <AdminCard
            title="Prisma"
            href="https://cloud.prisma.io/"
            image="https://devicons.railway.app/i/prisma-light.svg"
          />
          <AdminCard
            title="Railway"
            href="https://railway.app/"
            image="https://devicons.railway.app/i/railway-light.svg"
          />

          <AdminCard
            title="GitHub"
            href="https://github.com/scrobble-moe/"
            image="https://devicons.railway.app/i/github-light.svg"
          />
        </div>

        <div className="flex mx-auto justify-between max-w-2xl">
          <AdminCard
            title="Better Uptime"
            href="https://betteruptime.com/team/23448/monitors"
            image="/betteruptime.svg"
          />

          <AdminCard
            title="Logtail"
            href="https://logtail.com/team/49555/sources"
            image="/logtail.svg"
          />

          {/* <a
            title="GitHub"
            href="https://github.com/scrobble-moe/"
            className="flex w-40 h-40 bg-gray-100 rounded-lg cursor-pointer hover:scale-95"
          >
            <div className="m-auto">
              <Image src="" width={100} height={100} />
            </div>
          </a> */}
        </div>
      </TabLayout>
    </Card>
  );
};

export default Admin;
