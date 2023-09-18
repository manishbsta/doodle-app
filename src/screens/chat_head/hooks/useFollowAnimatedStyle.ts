import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

type AnimatedPosition = {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
};

export const useFollowAnimatedStyle = ({x, y}: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: followX.value,
        },
        {translateY: followY.value},
      ],
    };
  });

  return {followX, followY, rStyle};
};
