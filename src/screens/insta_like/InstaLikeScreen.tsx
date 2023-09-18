import React, {createRef, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  GestureType,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {IMAGES} from '../../../assets/images';
import {SCREEN_WIDTH} from '../../constants/constants';

const InstaLikeScreen = () => {
  const ref = useRef<GestureType | undefined>();
  const [loves, setLoves] = useState<number>(0);
  const likeScale = useSharedValue(0);

  const updateLoves = () => {
    setLoves(loves => loves + 1);
  };

  const doubleTapHandler = Gesture.Tap()
    .maxDelay(200)
    .numberOfTaps(2)
    .onEnd(_ => {
      likeScale.value = 0;
      runOnJS(updateLoves)();
      likeScale.value = withSpring(1, undefined, finished => {
        if (finished) {
          likeScale.value = withDelay(150, withSpring(0));
        }
      });
    });

  const rLikeStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Math.max(likeScale.value, 0)}],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={{flex: 1}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <View style={styles.user_container}>
            <Image source={IMAGES.admin} style={styles.admin_pic} />
            <Text style={styles.bold}>manishbsta</Text>
          </View>
          <GestureDetector gesture={doubleTapHandler}>
            <Animated.View style={styles.image_container}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={IMAGES.kaisa_2}
              />
              <Animated.Image
                source={IMAGES.like}
                style={[styles.like_icon, rLikeStyle]}
                resizeMode="contain"
              />
            </Animated.View>
          </GestureDetector>
          <View style={styles.textContainer}>
            <Text>
              <Text style={styles.bold}>{loves.toString()} </Text>
              loves
            </Text>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </View>
  );
};

export default InstaLikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  user_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  admin_pic: {
    height: 45,
    width: 45,
    resizeMode: 'cover',
    borderRadius: 60,
    marginRight: 8,
  },

  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.8,
  },

  like_icon: {
    width: 100,
    height: 100,
    position: 'absolute',
  },

  bold: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },

  textContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
});
