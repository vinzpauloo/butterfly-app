import React from "react";

import SingleChatScreen from "../../SingleChatScreen";
import UserProfileSettingsHeader from "../../../components/UserProfileSettingsHeader";

const CustomerService = () => {
  return (
      <>
      <UserProfileSettingsHeader title='在线客服' btnRight={null} />
        <SingleChatScreen/>
        </>
  );
};


export default CustomerService;
