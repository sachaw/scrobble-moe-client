import React from "react";

import { Card } from "components/Card";
import { CredentialsGroup } from "components/credentials/CredentialsGroup";

const Credentials = (): JSX.Element => {
  return (
    <Card title="Credentials">
      <CredentialsGroup />
    </Card>
  );
};

export default Credentials;
