import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Button({ title, style, onPress }) {
  return (
    <View style={[styles.mainContainer, style]}>
      <Pressable onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'black',
  },

  title: {
    color: 'white',
    textAlign: 'center',
  }

});
