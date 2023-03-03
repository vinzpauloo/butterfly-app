import React from 'react'

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { chatTabSubNav } from "data/chatTabSubNav";
import ExperimentalTopTabs from 'components/ExperimentalTopTabs';

type Props = {}

const Chat = (props: Props) => {
  return <MaterialTopTabs data={chatTabSubNav} />;

  // EXPERIMENTAL FOR NOW
  // return <ExperimentalTopTabs/>
}

export default Chat