import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "../../constants/constants";
import { BACKGROUND_COLOR, PAGES } from "../../constants/onboarding";
import Dot from "./components/Dot";
import Page from "./components/Page";

const OnboardingScreen = () => {
  const offsetX = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      offsetX.value = e.contentOffset.x;
    },
  });

  const activeDotIndex = useDerivedValue(() => {
    return Math.round(offsetX.value / SCREEN_WIDTH);
  });

  const onIconPress = () => {
    if (activeDotIndex.value === PAGES.length - 1) {
      scrollRef.current?.scrollTo({
        x: 0,
      });
      return;
    }

    scrollRef.current?.scrollTo({
      x: SCREEN_WIDTH * (activeDotIndex.value + 1),
    });
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => {
          return (
            <Page
              key={index.toString()}
              index={index}
              page={page}
              translateX={offsetX}
            />
          );
        })}
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={styles.fillCenter}>
          {PAGES.map((_, index) => {
            return (
              <Dot key={index} index={index} activeDotIndex={activeDotIndex} />
            );
          })}
        </View>
        <View style={styles.fillCenter}>
          <Text style={styles.text}>VIEW BOARD</Text>
        </View>
        <View style={styles.fillCenter}>
          <TouchableWithoutFeedback onPress={onIconPress}>
            <Text>{"--->"}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    width: SCREEN_WIDTH,
    height: 60,
    flexDirection: "row",
  },
  fillCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    letterSpacing: 1.7,
    fontWeight: "500",
  },
});
