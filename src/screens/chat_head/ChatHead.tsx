import React from 'react';
import {StatusBar, Text, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from '../../constants/constants';
import {CIRCLE_RADIUS, CIRCLE_SIZE} from './constants/constants';
import {useFollowAnimatedStyle} from './hooks/useFollowAnimatedStyle';

const ChatHeadScreen = () => {
  const translateX = useSharedValue(SCREEN_WIDTH - (CIRCLE_SIZE + 10));
  const translateY = useSharedValue(STATUS_BAR_HEIGHT + 10);
  const context = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(e => {
      translateX.value = e.translationX + context.value.x;
      translateY.value = e.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > SCREEN_WIDTH / 2 - CIRCLE_RADIUS) {
        translateX.value = SCREEN_WIDTH - (CIRCLE_SIZE + 10);
      } else {
        translateX.value = 10;
      }

      if (translateY.value > SCREEN_HEIGHT - CIRCLE_SIZE) {
        translateY.value = SCREEN_HEIGHT - (CIRCLE_RADIUS + 10);
      } else if (translateY.value < 10 + STATUS_BAR_HEIGHT) {
        translateY.value = 10 + STATUS_BAR_HEIGHT;
      }
    });

  const {
    followX: greenX,
    followY: greenY,
    rStyle: gRStyle,
  } = useFollowAnimatedStyle({x: translateX, y: translateY});
  const {
    followX: blueX,
    followY: blueY,
    rStyle: bRStyle,
  } = useFollowAnimatedStyle({x: greenX, y: greenY});

  const {rStyle: rRStyle} = useFollowAnimatedStyle({x: blueX, y: blueY});

  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent />
      <GestureHandlerRootView style={styles.container}>
        <Animated.View
          style={[styles.circle, rRStyle, {backgroundColor: 'red'}]}
        />
        <Animated.View
          style={[styles.circle, bRStyle, {backgroundColor: 'blue'}]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.circle, gRStyle, {backgroundColor: 'green'}]}
          />
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
};

export default ChatHeadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  circle: {
    opacity: 0.8,
    aspectRatio: 1,
    elevation: 0.8,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: 'red',
    position: 'absolute',
  },
});
