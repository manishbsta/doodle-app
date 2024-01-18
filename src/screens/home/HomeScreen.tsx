import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackParams } from "../../navigation/types/types";
import DashboardTile from "./components/DashboardTile";

type Props = NativeStackScreenProps<NativeStackParams, "home_screen">;
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.tilesContainer}>
          <DashboardTile
            label="Chat Head"
            onPress={() => navigation.navigate("chat_head_screen")}
          />
          <DashboardTile
            label="Color Picker"
            onPress={() => navigation.navigate("color_picker_screen")}
          />
          <DashboardTile
            label="Insta Like"
            onPress={() => navigation.navigate("insta_like_screen")}
          />
          <DashboardTile
            label="Pinch Kai'sa"
            onPress={() => navigation.navigate("pinch_kaisa_screen")}
          />
          <DashboardTile
            label="Scroll with Style"
            onPress={() => navigation.navigate("scrolling_screen")}
          />
          <DashboardTile
            label="Theme Changer"
            onPress={() => navigation.navigate("theme_changer_screen")}
          />
          <DashboardTile
            label="Circular Progress Bar"
            onPress={() => navigation.navigate("circular_progress_bar")}
          />
          <DashboardTile
            label="Segmented Controls"
            onPress={() => navigation.navigate("segmented_controls")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  tilesContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 15,
    rowGap: 15,
  },
});
