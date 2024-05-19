import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating, onChange }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity
          key={star}
          onPress={() => onChange(star)}
          style={styles.starButton}
        >
          <Icon
            name={star <= rating ? 'star' : 'star-o'}
            size={30}
            color="#0096FF"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starButton: {
    padding: 5,
  },
});

export default StarRating;
