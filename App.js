//import React from 'react';
import { View } from 'react-native';
//import Login from './Login'; 
import Onboard from './Onboard'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as React from 'react';
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import Home from './Home';
import ChatScreen from './MessagesScreen';
import SelectChatUserScreen from './SelectChatUserScreen';
import DiscoverPeopleChat from './DiscoverPeople';
import DiscoverChat from './DiscoverChat';
import DiscoverServicesScreen from './NearbyServices';
import ActivitiesScreen from './ActivitiesScreen';
import CustomMarker from './CustomMarker';
import NearbyServices from './NearbyServices';
import ChatBotScreen from './MessagesScreen';
import LocationScreen from './Location';


const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "LoginScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} />
        <Stack.Screen name="DiscoverChat" component={DiscoverChat} />
        <Stack.Screen name="CustomMarker" component={CustomMarker} />
        <Stack.Screen name="ActivitiesScreen" component={ActivitiesScreen} />
        <Stack.Screen name="DiscoverServicesScreen" component={DiscoverServicesScreen} />
        <Stack.Screen name="NearbyServices" component={NearbyServices} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="SelectChatUserScreen" component={SelectChatUserScreen} />
        <Stack.Screen name="DiscoverPeopleChat" component={DiscoverPeopleChat} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
