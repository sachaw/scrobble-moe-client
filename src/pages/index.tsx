import React from "react";

import CTASection from "components/CTASection";
import SomeImage from "components/SomeImage";
import SomeText from "components/SomeText";

import { Box } from "@chakra-ui/react";

const Home = (): JSX.Element => {
  return (
    <Box mb={8} w="full">
      <SomeText />
      <SomeImage />
      <CTASection />
    </Box>
  );
};

export default Home;
