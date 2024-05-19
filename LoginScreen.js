import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'; // Import Alert
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { BackHandler } from 'react-native';
import { commonStyles } from './LoginSignupStyles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from './FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State variable for loading indicator

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in both email and password');
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);

      // Store user authentication state in AsyncStorage
      await AsyncStorage.setItem('userToken', 'authenticated');

      navigation.navigate('Home');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log('Login failed:', error.message);
      if (error.code === 'auth/invalid-login-credentials') {
        setPassword('');
        alert('Incorrect email or password. Please try again.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); 
    }
  };

  const ForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => { alert("Password reset email sent"); })
      .catch((error) => { alert(error); });
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

      {/* Background with translucency when loading */}
      {loading && <View style={[commonStyles.background, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />}

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
      <View style={{ flex: 1, justifyContent: 'center', paddingTop: 40, paddingBottom: 10 }}>

        {/* title */}
        <View style={commonStyles.titleContainer}>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            style={commonStyles.titleText}>
            Login
          </Animated.Text>
        </View>

        {/* form */}
        <View style={commonStyles.formContainer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            style={commonStyles.inputView}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={commonStyles.inputText.color}
              value={email}
              onChangeText={setEmail}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={commonStyles.inputView}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={commonStyles.inputText.color}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
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

          <Animated.View style={commonStyles.buttonContainer} entering={FadeInDown.delay(400).duration(1000).springify()}>
            <TouchableOpacity style={commonStyles.button} onPress={login}>
              <Text style={commonStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            style={commonStyles.linkContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
              <Text style={commonStyles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={() => { ForgotPassword() }}>
            <Text>Forgot Password? </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading indicator */}
      {loading && (
        <View style={commonStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}
