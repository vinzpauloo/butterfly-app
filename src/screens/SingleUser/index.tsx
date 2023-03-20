import Moment from "./tabs/Moment";
import Projects from "./tabs/Projects";
import React from "react";
import SingleUserHeader from "components/headers/SingleUserHeader";
import StickyTabs from "layouts/StickyTabs";
import { translationStore } from "../../zustand/translationStore";

const SingleUserScreen = () => {
  const translations = translationStore((state) => state.translations);
  const tabsData = {
    Header: SingleUserHeader,
    tabItems: [
      {
        name: "moment",
        label: translations.moment,
        Content: <Moment />,
      },
      {
        name: "projects",
        label: translations.work,
        Content: <Projects />,
      },
    ],
  };

  return <StickyTabs data={tabsData} />;
};

export default SingleUserScreen;
