import { Image, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/constants";
import { PageInterface } from "../../../constants/onboarding";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type PageProps = {
  page: PageInterface;
  translateX: Animated.SharedValue<number>;
  index: number;
};

const Page: FC<PageProps> = ({ page, translateX, index }) => {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0]);
    return {
      transform: [{ scale }],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const progeess = interpolate(translateX.value, inputRange, [0, 0, 1]);
    const opacity = interpolate(translateX.value, inputRange, [0.2, 1, 0.2]);
    return { opacity, transform: [{ rotate: `${progeess * Math.PI}rad` }] };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[styles.image, rImageStyle]}
        />
      </View>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.description}>{page.description}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  circleContainer: {
    width: SCREEN_WIDTH * 0.7,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  image: {
    height: SCREEN_HEIGHT * 0.5,
    resizeMode: "contain",
    aspectRatio: 1,
    position: "absolute",
  },
  circle: {
    width: "100%",
    height: "100%",
    borderRadius: SCREEN_WIDTH * 0.5,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    marginBottom: 15,
    fontWeight: "700",
  },
  description: {
    textAlign: "center",
    color: "gray",
  },
});
