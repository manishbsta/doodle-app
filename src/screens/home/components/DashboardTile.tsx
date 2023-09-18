import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  label: string;
  onPress: () => void;
};
const DashboardTile: React.FC<Props> = ({label, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardTile;

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    backgroundColor: '#e0f2f1',
    overflow: 'hidden',
    borderRadius: 10,
    height: 90,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  label: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
