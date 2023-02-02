import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Actionsheet, Box, Center } from "native-base";

import { globalStyle } from "globalStyles";

import CommentList from "features/commentList";
import CommentTextInput from "./CommentTextInput";

const windowHeight = Dimensions.get('window').height;

const BottomComment = ({ onOpen, isOpen, onClose }) => {
	return (
		<Center>
			<Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
				<Actionsheet.Content
					padding={0}
					borderTopRadius="0"
					backgroundColor={globalStyle.primaryColor}
				>
					<Box w={"100%"} h={windowHeight / 2.5} p={2}>
						<CommentList/>
					</Box>
				</Actionsheet.Content>
				<CommentTextInput/>
			</Actionsheet>
		</Center>
	);
};

export default BottomComment;

const styles = StyleSheet.create({});
