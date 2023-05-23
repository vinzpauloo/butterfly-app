import { StyleSheet, View } from "react-native";
import React from "react";

import FeedContent from "components/feed/FeedContent";
import { GLOBAL_COLORS } from "global";

export default function LikeFeeds({ data }) {
  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <FeedContent key={index} data={item.feeds} />
          <View style={styles.divider} />
        </React.Fragment>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 8,
    backgroundColor: GLOBAL_COLORS.videoContentBG,
  },
});
