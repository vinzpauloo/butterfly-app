import React from "react";

import Container from "components/Container";

import { momentSubNav } from "data/momentSubNav";
import StickyTabs from "layouts/StickyTabs";

type Props = {};

const Moment = (props: Props) => {
  return (
    <Container>
      <StickyTabs data={momentSubNav} />
    </Container>
  );
};

export default Moment;