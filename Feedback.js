import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const FeedbackScreen = ({ navigation }) => {
  useEffect(() => {
    const sendFeedback = () => {
      const email = 'mailto:abdulrocker4@gmail.com,sohailsherazii12@gmail.com?subject=Feedback';
      Linking.openURL(email).catch(err => console.error('Error:', err));
    };

    sendFeedback();
    
    // Go back to the previous screen after opening the email client
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opening Email...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
  },
});

export default FeedbackScreen;
