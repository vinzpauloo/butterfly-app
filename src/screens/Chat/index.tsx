import React from 'react'

import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import { chatTabSubNav } from "data/chatTabSubNav";

type Props = {}

const Chat = (props: Props) => {
  return <MaterialTopTabs data={chatTabSubNav} />;
}

export default Chat