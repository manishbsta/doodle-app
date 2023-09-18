import React, {useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView, Switch} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {SCREEN_HEIGHT} from '../../constants/constants';
import {Colors, SWITCH_TRACK_COLOR} from './constant/constant';

type Theme = 'light' | 'dark';
const ThemeChangerScreen = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const progress = useDerivedValue(() => {
    return theme === 'light' ? withTiming(0) : withTiming(1);
  }, [theme]);

  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background],
    );

    return {backgroundColor};
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );

    return {backgroundColor};
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );

    return {color};
  });

  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent />
      <GestureHandlerRootView style={{flex: 1}}>
        <Animated.View style={[styles.container, rContainerStyle]}>
          <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
          <Animated.View style={[styles.circle, rCircleStyle]}>
            <Switch
              thumbColor="violet"
              value={theme === 'dark'}
              trackColor={SWITCH_TRACK_COLOR}
              onValueChange={val => setTheme(val ? 'dark' : 'light')}
            />
          </Animated.View>
        </Animated.View>
      </GestureHandlerRootView>
    </>
  );
};

export default ThemeChangerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_HEIGHT * 0.3,
    borderRadius: (SCREEN_HEIGHT * 0.3) / 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  text: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 70,
    letterSpacing: 2,
  },
});
