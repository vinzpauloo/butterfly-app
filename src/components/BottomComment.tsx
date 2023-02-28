import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Actionsheet, Box } from "native-base";

import CommentList from "features/commentList";
import { GLOBAL_COLORS } from "global";

const BottomComment = ({ workID, isOpen, onClose }) => {
  return (
      <Actionsheet isOpen={isOpen} onClose={onClose} >
        <Actionsheet.Content
          _dragIndicator={{ marginTop: 1 }}
          padding={0}
          borderTopRadius="24"
          backgroundColor={GLOBAL_COLORS.primaryColor}
        >
          <Box w={"100%"} h={Dimensions.get("window").height / 2.5}>
            <CommentList workID={workID} />
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
  );
};

export default BottomComment;

const styles = StyleSheet.create({});
