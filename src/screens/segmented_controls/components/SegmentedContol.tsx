import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SegmentedContolProps = {
  options: string[];
  selectedOption: string;
  onOptionPress: (option: string) => void;
};

const internalOffset = 10;
const SegmentedContol: React.FC<SegmentedContolProps> = ({
  onOptionPress,
  options,
  selectedOption,
}) => {
  const { width: wW } = useWindowDimensions();
  const segmentedControlWidth = wW - 40;
  const itemWidth =
    (segmentedControlWidth - internalOffset * 2) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * options.indexOf(selectedOption) + internalOffset
      ),
    };
  }, [itemWidth, selectedOption, options]);

  return (
    <View style={[styles.container, { width: segmentedControlWidth }]}>
      <Animated.View
        style={[rStyle, styles.selectionIndicator, { width: itemWidth }]}
      />
      {options.map((item) => {
        return (
          <Pressable
            key={item}
            style={[styles.item, { width: itemWidth }]}
            onPress={() => onOptionPress(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SegmentedContol;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#e1e1e1",
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: internalOffset,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontWeight: "700",
    fontSize: 16,
  },
  selectionIndicator: {
    position: "absolute",
    height: "80%",
    top: "10%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
