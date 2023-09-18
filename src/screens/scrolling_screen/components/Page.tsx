import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from '../../../constants/constants';

type Props = {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
};

const CIRCLE_SIZE = SCREEN_WIDTH * 0.8;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;

const Page: FC<Props> = ({index, title, translateX}) => {
  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [SCREEN_HEIGHT / 2, 0, -SCREEN_HEIGHT / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Animated.Text style={[styles.text, rTextStyle]}>{title}</Animated.Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT + STATUS_BAR_HEIGHT + 50,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_RADIUS,
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,256, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 70,
    color: '#fff',
    textTransform: 'capitalize',
    fontWeight: '700',
    textAlign: 'center',
    padding: 30,
  },
});
