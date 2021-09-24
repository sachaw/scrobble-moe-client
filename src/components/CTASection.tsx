import React from 'react';

import { AiOutlineGithub, AiOutlineLogin } from 'react-icons/ai';
import { BsViewStacked } from 'react-icons/bs';

import { Box, Button, Code, Flex } from '@chakra-ui/react';

const CTASection = (): JSX.Element => {
  return (
    <Box textAlign="center" marginTop={8}>
      <Box marginY={2}>
        <Code>https://scrobble.moe/api/{`<SECRET>`}</Code>
        <br />
      </Box>

      <Flex justifyContent="center" alignItems="center" gridGap={2}>
        <Button as="a" href="/auth" leftIcon={<AiOutlineLogin />} size="sm">
          Login
        </Button>
        <Button as="a" href="/dashboard" leftIcon={<BsViewStacked />} size="sm">
          Dashboard
        </Button>
        <Button
          as="a"
          href="https://github.com/sachaw/scrobble-moe-client"
          target="_blank"
          leftIcon={<AiOutlineGithub />}
          size="sm"
        >
          Open in Github
        </Button>
      </Flex>
    </Box>
  );
};

export default CTASection;
