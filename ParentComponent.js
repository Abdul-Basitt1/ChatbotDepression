import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { auth } from './FirebaseConfig'; // Importing our Firebase app instance
import DiscoverChat from './DiscoverChat';

const ParentComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("Subscribing to authentication state changes...");
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        setCurrentUser(user);
      } else {
        // No user is signed in
        console.log("No user is signed in.");
        setCurrentUser(null);
      }
    });

    // Unsubscribe from the auth listener when component unmounts
    return () => {
      console.log("Unsubscribing from authentication state changes...");
      unsubscribe();
    };
  }, []);

  console.log("Rendering ParentComponent...");
  return (
    <View>
      {currentUser ? (
        <DiscoverChat currentUser={currentUser} />
      ) : (
        <Text>Please sign in to view the chat.</Text>
      )}
    </View>
  );
};

export default ParentComponent;
