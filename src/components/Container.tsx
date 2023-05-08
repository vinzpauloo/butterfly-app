import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GLOBAL_COLORS } from "global";

interface DataTypes {
  children: any;
}

let scale = Dimensions.get("screen").scale / Dimensions.get("window").scale;
let screen_height = Dimensions.get("window").height * scale;
let screen_width = Dimensions.get("window").width * scale;

const Container: React.FC<DataTypes> = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    height: screen_height,
    width: screen_width,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        const newScale = screen.scale / window.scale;
        setDimensions({
          height: window.height * newScale,
          width: window.width * newScale,
        });
      }
    );

    return () => subscription?.remove();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { height: dimensions.height, width: dimensions.width },
      ]}
    >
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
});
