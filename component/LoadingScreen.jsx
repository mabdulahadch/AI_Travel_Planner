import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors'; // Assuming you have Colors defined

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.GREY} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE, // Background color for the loading screen
  },
  loadingText: {
    marginTop: 20,
    fontFamily: 'outfit-bold', // Use the font once loaded
    fontSize: 18,
    color: Colors.GREY,
  },
});
