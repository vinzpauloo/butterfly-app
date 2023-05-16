import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Actionsheet, Box } from "native-base";

import CommentList from "features/commentList";
import { GLOBAL_COLORS } from "global";
import CommentTextInput from "./CommentTextInput";

const BottomComment = ({ workID, isOpen, onClose }) => {
  const { height } = useWindowDimensions();
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        _dragIndicator={{ marginTop: 1 }}
        padding={0}
        borderTopRadius="24"
        backgroundColor={GLOBAL_COLORS.primaryColor}
      >
        <Box w={"100%"} h={height / 2.5}>
          <CommentList workID={workID} />
        </Box>
      </Actionsheet.Content>
      <CommentTextInput workID={workID} keyboardAvoidBehavior="position" />
    </Actionsheet>
  );
};

export default BottomComment;

const styles = StyleSheet.create({});
