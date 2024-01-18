import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SegmentedContol from "./components/SegmentedContol";

const options = ["Light", "Standard", "Pro"];
const SegmentedControlsScreen = () => {
  const [selectedOption, setSelectedOption] = useState(options[1]);

  return (
    <View style={styles.container}>
      <SegmentedContol
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
    </View>
  );
};

export default SegmentedControlsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
