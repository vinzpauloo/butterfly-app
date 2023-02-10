import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { globalStyle } from "globalStyles";

const { width, height } = Dimensions.get("window");

const CarouselContainer = ({ images }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const handlePrev = () => {
    //@ts-ignore
    isCarousel?.current?.prev();
  };
  const handleNext = () => {
    //@ts-ignore
    isCarousel?.current?.next();
  };
  const BannerItem = ({ item, index }: any) => {
    return (
      <View style={styles.bannerItem} key={index}>
        <Image source={item} style={styles.image} />
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <AntDesign
          name="leftcircleo"
          size={20}
          style={styles.leftIcon}
          onPress={handlePrev}
          color={globalStyle.secondaryColor}
        />
        <Carousel
          ref={isCarousel}
          loop
          width={width}
          height={150}
          autoPlay={true}
          data={images}
          scrollAnimationDuration={1000}
          autoPlayInterval={7000}
          onSnapToItem={(index: any) => setIndex(index)}
          overscrollEnabled={true}
          renderItem={BannerItem}
          pagingEnabled={true}
        />
        <AntDesign
          name="rightcircleo"
          size={20}
          style={styles.rightIcon}
          onPress={handleNext}
          color={globalStyle.secondaryColor}
        />
        <View style={styles.pagination}>
          {images.map((_, idx) => (
            <FontAwesome
              key={idx}
              name="circle"
              size={7}
              style={styles.circle}
              color={index === idx ? globalStyle.secondaryColor : "white"}
            />
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CarouselContainer;

const styles = StyleSheet.create({
  container: {
    height: 135,
    position: "relative",
    flexDirection: "row",
    width: width,
    marginBottom: 15,
  },
  leftIcon: {
    position: "absolute",
    left: 20,
    top: "50%",
    zIndex: 10,
    transform: [{ translateY: -15 }],
  },
  rightIcon: {
    position: "absolute",
    right: 20,
    top: "50%",
    zIndex: 10,
    transform: [{ translateY: -15 }],
  },
  pagination: {
    position: "absolute",
    width: 200,
    zIndex: 10,
    bottom: 10,
    left: width / 2,
    transform: [{ translateX: -100 }],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    marginHorizontal: 2,
  },
  bannerItem: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", //contain
  },
});
