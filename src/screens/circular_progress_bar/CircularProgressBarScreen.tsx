import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ReText } from "react-native-redash";

const BACKGROUND_COLOR = "#7986cb";
const STROKE_COLOR = "#b3e5fc";
const BACKGROUND_STROKE_COLOR = "#5c6bc0";

const { height, width } = Dimensions.get("window");
const CIRCLE_PERIMETER = 1000;
const R = CIRCLE_PERIMETER / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CircularProgressBarScreen = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 2000 });
  }, []);

  const animatedProps = useAnimatedProps<Animated.AnimateProps<Circle>>(() => {
    return {
      strokeDashoffset: CIRCLE_PERIMETER * (1 - progress.value),
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)} `;
  });

  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
          fill={"transparent"}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={20}
          fill={"transparent"}
          strokeDasharray={CIRCLE_PERIMETER}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>
    </View>
  );
};

export default CircularProgressBarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  progressText: {
    fontSize: 90,
    color: "#cfd8dc",
    textAlign: "center",
  },
});
