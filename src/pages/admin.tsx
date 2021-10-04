import React from 'react';

import { Card } from 'components/Card';
import { TabLayout } from 'components/TabLayout';
import Image from 'next/image';

const Admin = (): JSX.Element => {
  return (
    <Card title="Admin">
      <TabLayout>
        <div className="flex mx-auto space-x-4">
          <a
            title="Prisma"
            href="https://cloud.prisma.io/"
            className="flex w-40 h-40 bg-gray-100 rounded-lg cursor-pointer hover:scale-95"
          >
            <div className="m-auto">
              <Image
                src="https://devicons.railway.app/i/prisma-light.svg"
                width={100}
                height={100}
              />
            </div>
          </a>
          <a
            title="Railway"
            href="https://railway.app/"
            className="flex w-40 h-40 bg-gray-100 rounded-lg cursor-pointer hover:scale-95"
          >
            <div className="m-auto">
              <Image
                src="https://devicons.railway.app/i/railway-light.svg"
                width={100}
                height={100}
              />
            </div>
          </a>
          <a
            title="GitHub"
            href="https://github.com/scrobble-moe/"
            className="flex w-40 h-40 bg-gray-100 rounded-lg cursor-pointer hover:scale-95"
          >
            <div className="m-auto">
              <Image
                src="https://devicons.railway.app/i/github-light.svg"
                width={100}
                height={100}
              />
            </div>
          </a>
        </div>
      </TabLayout>
    </Card>
  );
};

export default Admin;
