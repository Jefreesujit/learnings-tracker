import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Timeline = () => {
  return (
    <View style={styles.container}>
      <Text>Timeline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Timeline;
