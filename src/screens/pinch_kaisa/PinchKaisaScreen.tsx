import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {IMAGES} from '../../../assets/images';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from '../../constants/constants';

const PinchKaisaScreen = () => {
  const scale = useSharedValue(1);
  const scaleContext = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const offsetXContext = useSharedValue(0);
  const offsetYContext = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(e => {
      offsetXContext.value = offsetX.value;
      offsetYContext.value = offsetY.value;
    })
    .onUpdate(e => {
      offsetX.value = e.translationX + offsetXContext.value;
      offsetY.value = e.translationY + offsetYContext.value;
    })
    .onEnd(() => {
      if (
        offsetX.value > SCREEN_WIDTH + 10 ||
        offsetX.value < SCREEN_WIDTH - 10
      ) {
        offsetX.value = withTiming(0);
        offsetX.value = withTiming(0);
      }
      if (
        offsetY.value > SCREEN_HEIGHT + 10 ||
        offsetY.value < SCREEN_HEIGHT - 10
      ) {
        offsetY.value = withTiming(0);
        offsetY.value = withTiming(0);
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      scaleContext.value = scale.value;
    })
    .onUpdate(e => {
      scale.value = scaleContext.value + (e.scale - scaleContext.value);
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const gestureHandler = Gesture.Simultaneous(pinchGesture, panGesture);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value},
        {translateX: offsetX.value},
        {translateY: offsetY.value},
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <StatusBar translucent backgroundColor={'transparent'} />
      <GestureDetector gesture={gestureHandler}>
        <Animated.Image
          source={IMAGES.kaisa}
          style={[styles.image, rStyle]}
          resizeMode="cover"
        />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default PinchKaisaScreen;

const styles = StyleSheet.create({
  image: {
    height: SCREEN_HEIGHT + STATUS_BAR_HEIGHT! + 50,
    width: SCREEN_WIDTH,
  },
});
