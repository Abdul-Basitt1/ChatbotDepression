import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from './StarRating'; // Adjust the path if necessary
import * as Animatable from 'react-native-animatable';

const RateUsScreen = ({navigation}) => {
  const [rating, setRating] = useState(0);
  
  const sendFeedback = (rating) => {
    const email = `mailto:abdulrocker4@gmail.com,sohailsherazii12@gmail?subject=App Rating&body=I rate the app ${rating} star(s)`;
    Linking.openURL(email).catch(err => console.error('Error:', err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Animatable.View 
        animation="fadeInUp" 
        duration={1000} 
        style={styles.card}
      >
        <Text style={styles.title}>Rate Our App</Text>
        <StarRating
          rating={rating}
          onChange={setRating}
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => sendFeedback(rating)}
        >
          <Text style={styles.buttonText}>Send Feedback</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0096FF',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,  // Adjust based on your header height
    left: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#0096FF',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0096FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default RateUsScreen;
