import React from 'react';

import { LinkButton } from 'components/Button';
import { Card } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { TabLayout } from 'components/TabLayout';
import { useRouter } from 'next/router';
import { FiCornerDownLeft, FiDelete } from 'react-icons/fi';

const Subscription = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Card title="Subscriptions">
      <TabLayout
        actions={
          <>
            <LinkButton
              nested
              href="/subscriptions"
              rightIcon={<FiCornerDownLeft />}
            >
              Back
            </LinkButton>
            <IconButton
              icon={<FiDelete />}
              onClick={(): void => {
                //
              }}
            />
          </>
        }
      >
        {id}
      </TabLayout>
    </Card>
  );
};

export default Subscription;
