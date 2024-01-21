import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface DotProps {
  index: number;
  activeDotIndex: Animated.SharedValue<number>;
}
const Dot: FC<DotProps> = ({ activeDotIndex, index }) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;
    return {
      backgroundColor: withTiming(isActive ? "black" : "white", {
        duration: 150,
      }),
    };
  });

  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "black",
    marginHorizontal: 5,
    borderWidth: 1,
  },
});
