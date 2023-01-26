import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";

import { photographySubNav } from "data/photographySubNav";

const Photography = () => {
  return <MaterialTopTabs data={photographySubNav} />;
};

export default Photography;
