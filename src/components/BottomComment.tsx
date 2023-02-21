import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Actionsheet, Box } from "native-base";

import { GLOBAL_COLORS } from "global";

import CommentList from "features/commentList";
import CommentTextInput from "./CommentTextInput";
import CommentListSkeleton from "./skeletons/CommentListSkeleton";

import { Work } from "hooks/useWork";
import { useQuery } from "@tanstack/react-query";

const windowHeight = Dimensions.get("window").height;

const BottomComment = ({ commentForeignID, isOpen, onClose }) => {
  
  const { getWorkComments } = Work();
  const { isLoading, isError, data, error, status, refetch } = useQuery({
    queryKey: ["workComments", commentForeignID],
    queryFn: () => getWorkComments({
      foreign_id: commentForeignID,
      skip: 0,
      limit: 5
    }),
    onSuccess: (data) => {
      console.log("=== commentlist fetched from backend! ===")
    },
    onError: (error) => {
      console.log("Error", error);
    },
    enabled: isOpen,
  });

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} >
      <Actionsheet.Content
        _dragIndicator={{ marginTop: 1 }}
        padding={0}
        borderTopRadius="24"
        backgroundColor={GLOBAL_COLORS.primaryColor}
      >
        <Box w={"100%"} h={windowHeight / 2.5} p={2}>
          {isLoading ? 
            <CommentListSkeleton/>
          :
            <CommentList data={data} />
          }
        </Box>
      </Actionsheet.Content>
      <CommentTextInput keyboardAvoidingBehavior="position" />
    </Actionsheet>
  );
};

export default BottomComment;

const styles = StyleSheet.create({});
