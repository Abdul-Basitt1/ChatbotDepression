import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { BackHandler } from 'react-native'; 
import { commonStyles } from './LoginSignupStyles'; 
import { app, auth } from './FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as EmailValidator from 'email-validator'; // Import email validator

export default function SignupScreen() {
  const navigation = useNavigation();

  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  
  const signUp = async () => {
    if (!userName || !email || !password) {
      Alert.alert("Empty Fields", "Please fill in all fields.");
      return;
    }

    if (!EmailValidator.validate(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Access the newly created user
      const user = userCredential.user;
  
      // Update the user's profile with the username
      await updateProfile(user, {
        displayName: userName
      });
  
      // Save user details to Firestore
      const db = getFirestore(app);
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: userName,
        email: email
      });

      // Clear input fields
      setuserName("");
      setEmail("");
      setPassword("");
      
      // Show success message
      Alert.alert("Account Created", "Your account has been created successfully.");

      // Navigate to login screen
      navigation.navigate('LoginScreen');
    } catch(error) {
      console.log(error.code);
      console.log(error.message);
      Alert.alert("Sign Up Failed", error.message);
    }
  }  
  
  useEffect(() => {
    const backAction = () => {
      // Exit the app when the back button is pressed
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={commonStyles.container}>
      <StatusBar style="light" />
      <Image source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\background.png')} style={commonStyles.background} />
   
      {/* lights */}
      <View style={commonStyles.lightsContainer}>
        <Animated.Image 
          entering={FadeInUp.delay(200).duration(1000).springify()} 
          source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Bot.png')} 
          style={commonStyles.lightImage} 
        />
        <Animated.Image 
          entering={FadeInUp.delay(400).duration(1000).springify()} 
          source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Bot.png')} 
          style={commonStyles.lightImageSmall} 
        />
      </View>

      {/* title and form */}
      <View style={{ flex: 1, justifyContent: 'center', paddingTop: 48 }}>
        
        {/* title */}
        <View style={commonStyles.titleContainer}>
          <Animated.Text 
            entering={FadeInUp.duration(1000).springify()} 
            style={commonStyles.titleText}>
            Sign Up
          </Animated.Text>
        </View>

        {/* form */}
        <View style={commonStyles.formContainer}>
          <Animated.View 
            entering={FadeInDown.duration(1000).springify()} 
            style={commonStyles.inputView}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={commonStyles.inputText.color}
              value={userName}
              onChangeText={(text) => setuserName(text)}
            />
          </Animated.View>
          <Animated.View 
            entering={FadeInDown.delay(200).duration(1000).springify()} 
            style={commonStyles.inputView}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={commonStyles.inputText.color}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Animated.View>
          <Animated.View 
            entering={FadeInDown.delay(400).duration(1000).springify()} 
            style={commonStyles.inputView}>
            <View style={{ flexDirection: 'row', alignItems: 'cener', justifyContent: 'space-between' }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={commonStyles.inputText.color}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  source={
                    isPasswordVisible
                      ? require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\icons8-eye-50.png')
                      : require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\icons8-closed-eye-50.png')
                  }
                  style={{ width: 18, height: 18 }}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View style={commonStyles.buttonContainer} entering={FadeInDown.delay(600).duration(1000).springify()}>
            <TouchableOpacity style={commonStyles.button} onPress={signUp}>
              <Text style={commonStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(800).duration(1000).springify()} 
            style={commonStyles.linkContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
              <Text style={commonStyles.linkText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
