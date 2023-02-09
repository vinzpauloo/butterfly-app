import React from "react";

import { WebView } from 'react-native-webview'

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {privacyPolicyData} from "data/privacyPolicyData";
const PrivacyPolicy = () => {

  return (
      <>
        <UserProfileSettingsHeader title={null} btnRight={null}/>
        <WebView
            source={{ html: privacyPolicyData.map((item) => item.chinese.description).join('') }}
            style={{flex: 1}}
        />
      </>
  );
};

export default PrivacyPolicy;
