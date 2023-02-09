import React from "react";

import { WebView } from 'react-native-webview'

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {serviceProvisionsData} from "data/serviceProvisionsData";

const ServiceProvisions = () => {
    return (
        <>
            <UserProfileSettingsHeader title={null} btnRight={null}/>
            <WebView
                source={{ html: serviceProvisionsData.map((item) => item.chinese.description).join('') }}
                style={{flex: 1}}
            />
        </>
    )
}
export default ServiceProvisions;
