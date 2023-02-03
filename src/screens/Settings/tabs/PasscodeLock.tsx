import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";


const PasscodeLock = () => {
  const navigation = useNavigation<any>();

  const [selectedDots, setSelectedDots] = useState([]);
  const [lines, setLines] = useState([]);

  const [dots, setDots] = useState([
    { id: 1, x: 1, y: 1 },
    { id: 2, x: 1, y: 1 },
    { id: 3, x: 1, y: 1 },
    { id: 4, x: 1, y: 1 },
    { id: 5, x: 1, y: 1 },
    { id: 6, x: 1, y: 1 },
    { id: 7, x: 1, y: 1 },
    { id: 8, x: 1, y: 1 },
    { id: 9, x: 1, y: 1 },
  ]);

  const handleDotPress = (id) => {
    setSelectedDots([...selectedDots, id]);

    if (selectedDots.length > 0) {
      const startDot = dots.find(
        (dot) => dot.id === selectedDots[selectedDots.length - 1]
      );
      const endDot = dots.find((dot) => dot.id === id);
      setLines([...lines, { start: startDot, end: endDot }]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <View style={styles.titleAndBackContainer}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>应用锁</Text>
        </View>
      </View>

      <Text style={{ textAlign: "center" }}>
        Selected Dots: {selectedDots.join(", ")}
      </Text>

      <View style={styles.lockContainer}>
        {dots.map((dot) => (
          <View
            key={dot.id}
            style={[
              styles.dot,
              {
                left: dot.x,
                top: dot.y,
              },
              selectedDots.includes(dot.id) && styles.activeDot,
            ]}
            onStartShouldSetResponder={() => {
              handleDotPress(dot.id);
              return true;
            }}
          />
        ))}

        {lines.map((line, index) => (
          <View
            key={index}
            style={{
              position: "absolute",
              left: line.start.x + 50,
              top: line.start.y + 50,
              width: Math.abs(line.end.x - line.start.x),
              height: Math.abs(line.end.y - line.start.y),
              borderColor: "blue",
              borderWidth: 2,
              transform: [
                {
                  rotate: `${
                    Math.atan2(
                      line.end.y - line.start.y,
                      line.end.x - line.start.x
                    ) *
                    (180 / Math.PI)
                  }deg`,
                },
              ],
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    marginVertical: 0,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#191d26",
  },
  titleAndBackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    backgroundColor: "#262632",
    height: 50,
  },
  backBtn: {
    position: "absolute",
    left: 5,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  lockContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  dot: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#262632",
    margin: 10,
  },
  activeDot: {
    backgroundColor: "blue",
  },
});

export default PasscodeLock;
