import React, {useCallback} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SCREEN_WIDTH} from '../../constants/constants';
import ColorPicker from './components/ColorPicker';
import {BACKGROUND_COLOR, CIRCLE_SIZE, COLORS} from './constants/constants';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ColorPickerScreen = () => {
  const pickedColor = useSharedValue<string | number>(COLORS[0]);

  const onColorChanged = useCallback((color: number | string) => {
    'worklet';
    pickedColor.value = color;
  }, []);

  const rPickerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={BACKGROUND_COLOR} />
        <View style={styles.topContainer}>
          <Animated.View style={[styles.circle, rPickerStyle]} />
        </View>
        <View style={styles.bottomContainer}>
          <ColorPicker
            colors={COLORS}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
            maxWidth={SCREEN_WIDTH * 0.9}
            onColorChanged={onColorChanged}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ColorPickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },

  topContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradient: {
    borderRadius: 20,
    height: 40,
    width: SCREEN_WIDTH * 0.9,
  },
});
