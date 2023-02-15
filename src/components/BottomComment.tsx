import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Actionsheet, Box, Center } from "native-base";

import { GLOBAL_COLORS } from "global";

import CommentList from "features/commentList";
import CommentTextInput from "./CommentTextInput";

const windowHeight = Dimensions.get("window").height;

const BottomComment = ({ onOpen, isOpen, onClose }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        _dragIndicator={{ marginTop: 1 }}
        padding={0}
        borderTopRadius="24"
        backgroundColor={GLOBAL_COLORS.primaryColor}
      >
        <Box w={"100%"} h={windowHeight / 2.5} p={2}>
          <CommentList />
        </Box>
      </Actionsheet.Content>
      <CommentTextInput keyboardAvoidingBehavior="position" />
    </Actionsheet>
  );
};

export default BottomComment;

const styles = StyleSheet.create({});
