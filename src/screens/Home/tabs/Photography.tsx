import React from "react";

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import MasonryPhotos from "layouts/MasonryPhotos";
import { translationStore } from "../../../zustand/translationStore";

const Photography = () => {
  const translations = translationStore((state) => state.translations);
  const photographySubNav = {
    initialRoute: translations.all,
    screens: [
      {
        name: translations.all,
        component: (props) => <MasonryPhotos {...props} filter={"all"} />,
      },
      {
        name: translations.hottest,
        component: (props) => <MasonryPhotos {...props} filter={"hottest"} />,
      },
      {
        name: translations.latest,
        component: (props) => <MasonryPhotos {...props} filter={"latest"} />,
      },
    ],
  };
  return <MaterialTopTabs data={photographySubNav} />;
};

export default Photography;
