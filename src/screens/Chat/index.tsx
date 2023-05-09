import React from "react";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import All from "./tabs/All";
import Information from "./tabs/Information";
import { translationStore } from "../../zustand/translationStore";

type Props = {};

const Chat = (props: Props) => {
  const translations = translationStore((state) => state.translations);
  const chatTabSubNav = {
    initialRoute: translations.all,
    screens: [
      {
        name: translations.all,
        component: (props) => <All {...props} title={"all"} />,
      },
      {
        name: translations.information,
        component: (props) => <Information {...props} title={"information"} />,
      },
    ],
  };
  return <MaterialTopTabs data={chatTabSubNav} isEqualWidth />;
};

export default Chat;
