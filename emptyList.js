import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    width: 144,
    height: 144,
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  text: {
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default function EmptyList({ message }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\MidPic.png')} />
      <Text style={styles.text}>{message || 'Data not found'}</Text>
    </View>
  );
}
