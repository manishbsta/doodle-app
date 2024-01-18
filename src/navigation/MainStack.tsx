import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatHeadScreen from "../screens/chat_head/ChatHead";
import CircularProgressBarScreen from "../screens/circular_progress_bar/CircularProgressBarScreen";
import ColorPickerScreen from "../screens/color_picker/ColorPickerScreen";
import HomeScreen from "../screens/home/HomeScreen";
import InstaLikeScreen from "../screens/insta_like/InstaLikeScreen";
import PinchKaisaScreen from "../screens/pinch_kaisa/PinchKaisaScreen";
import ScrollingScreen from "../screens/scrolling_screen/ScrollingScreen";
import SegmentedControlsScreen from "../screens/segmented_controls/SegmentedControlsScreen";
import ThemeChangerScreen from "../screens/theme_changer/ThemeChangerScreen";
import { NativeStackParams } from "./types/types";

const { Navigator, Screen } = createNativeStackNavigator<NativeStackParams>();
const MainStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home_screen"
        options={{ title: "Home" }}
        component={HomeScreen}
      />
      <Screen
        name="color_picker_screen"
        options={{ title: "Color Picker" }}
        component={ColorPickerScreen}
      />
      <Screen
        name="chat_head_screen"
        options={{ title: "Chat Head" }}
        component={ChatHeadScreen}
      />

      <Screen
        name="insta_like_screen"
        options={{ title: "Insta-Like" }}
        component={InstaLikeScreen}
      />
      <Screen
        name="scrolling_screen"
        options={{ title: "Scrollable Pages" }}
        component={ScrollingScreen}
      />
      <Screen
        name="pinch_kaisa_screen"
        options={{ title: "Pinch Kaisa" }}
        component={PinchKaisaScreen}
      />
      <Screen
        name="theme_changer_screen"
        options={{ title: "Theme Changer" }}
        component={ThemeChangerScreen}
      />
      <Screen
        name="circular_progress_bar"
        options={{ title: "Circular Progress Bar" }}
        component={CircularProgressBarScreen}
      />
      <Screen
        name="segmented_controls"
        options={{ title: "Segmented Controls" }}
        component={SegmentedControlsScreen}
      />
    </Navigator>
  );
};

export default MainStack;
