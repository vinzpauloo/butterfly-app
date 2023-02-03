import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { VStack, HStack, Modal, Button, Text } from "native-base";
import { MasonryFlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { masonryImages } from "data/masonryImages";
import { photoGalleryImages } from "data/photoGalleryImages";
import Container from "components/Container";
import { globalStyle } from "globalStyles";
import VIPTag from "components/VIPTag";
import CustomModal from "components/CustomModal";

type Props = {};

type SingleImageProp = {
  idx: number;
  url: string;
  postTitle: string;
  totalLikes: string;
  height: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Content = ({ setOpen }) => {
  return (
    <Modal.Content bgColor={globalStyle.headerBasicBg}>
      <Modal.CloseButton />
      <Modal.Body>
        <VStack space={8} alignItems="center" margin={0} py={5}>
          <Text color="white">Upgrade membership first!</Text>

          <Button
            size="sm"
            style={styles.button}
            onPress={() => setOpen(false)}
          >
            Purchase VIP
          </Button>
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
};

const SingleImage = (props: SingleImageProp) => {
  const navigation = useNavigation<any>();

  const openVIPModal = () => {
    props.setOpen(true);
  };

  const handlePress = () => {
    navigation.navigate("PhotoGallery", {
      postTitle: props.postTitle,
      imageList: photoGalleryImages,
    });
  };

  return (
    <Pressable onPress={props.idx === 0 ? openVIPModal : handlePress}>
      <ImageBackground
        source={{ uri: props.url }}
        style={[styles.singleImage, { height: props.height }]}
        resizeMode="cover"
      >
        <VIPTag />
        <VStack style={styles.blackContainer}>
          <Text style={styles.whiteText}>{props.postTitle}</Text>
          <HStack space={1}>
            <MaterialCommunityIcons
              name="heart"
              color={globalStyle.secondaryColor}
              size={20}
            />
            <Text style={styles.whiteText}>{props.totalLikes}</Text>
          </HStack>
        </VStack>
      </ImageBackground>
    </Pressable>
  );
};

const MasonryPhotos = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container>
        <View style={styles.masonryContainer}>
          <MasonryFlashList
            data={masonryImages}
            numColumns={2}
            renderItem={({ item, index }) => (
              <SingleImage
                idx={index}
                url={item.imgURL}
                postTitle={item.postTitle}
                totalLikes={item.totalLikes}
                height={item.height}
                setOpen={setOpen}
              />
            )}
            estimatedItemSize={25}
            keyExtractor={(item, index) => "" + index}
          />
        </View>
      </Container>
      <CustomModal open={open} setOpen={setOpen}>
        <Content setOpen={setOpen} />
      </CustomModal>
    </>
  );
};

export default MasonryPhotos;

const styles = StyleSheet.create({
  masonryContainer: {
    flex: 1,
  },
  singleImage: {
    margin: 4,
  },
  blackContainer: {
    marginTop: "auto",
    backgroundColor: "rgba(0,0,0, 0.5)",
    paddingHorizontal: 6,
  },
  whiteText: {
    color: "white",
  },
  button: {
    backgroundColor: globalStyle.secondaryColor,
    borderRadius: 20,
    width: 120,
  },
});
