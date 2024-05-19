import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'; 
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app, auth, db } from './FirebaseConfig';

const CustomDrawer = props => {
  const navigation = useNavigation(); // Initialize navigation
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut(); // Sign out the current user
  //     console.log('User signed out successfully.');
  //     navigation.navigate('LoginScreen'); // Navigate back to the login screen
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            try {
              await auth.signOut(); // Sign out the current user
              console.log('User signed out successfully.');
              navigation.navigate('LoginScreen'); 
            } catch (error) {
              console.error('Error signing out:', error);
              // Show an alert if there's an error signing out
              Alert.alert(
                'Error',
                'An error occurred while signing out. Please try again.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    // Fetch the username associated with the logged-in user's email
    const fetchUsername = async () => {
      try {
        // const db = getFirestore(app);
        const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUsername(doc.data().username);
        });
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    // Fetch the Email associated with the logged-in user's email
    const fetchEmail = async () => {
      try {
        // const db = getFirestore(app);
        const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setEmail(doc.data().email);
        });
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchEmail();
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#0096FF'}}>
        <ImageBackground
          source={require('./assets/Bluebg.png')}
          style={{padding: 20}}>
          <Image
            source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\iconBotHome.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              //fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {username}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                //fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              {email}
            </Text>
            {/* <FontAwesome5 name="coins" size={14} color="#fff" /> */}
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={handleSignOut} style={{paddingVertical: 15}}> 
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                //fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
