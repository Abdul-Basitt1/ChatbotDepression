import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AnimatedText } from './AnimatedText';
import { sample } from 'lodash';
import { styles } from './HomeScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import RateUs from './RateUs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './FirebaseConfig';
import FeedbackScreen from './Feedback';
import RateUsScreen from './RateUs';
import LocationScreen from './Location';
import PrivacyPolicyScreen from './PrivacyPolicy';

const Drawer = createDrawerNavigator();

const quotes = [
  "There is hope, even when your brain tells you there isn’t.",
  "And if today all you did was hold yourself together, I’m proud of you.",
  "The bad news is time flies. The good news is you're the pilot.",
  "It is during our darkest moments that we must focus to see the light",
  "If I cannot do great things, I can do small things in a great way.",
  "A person who never made a mistake never tried anything new.",
  "All dreams are within reach. All you have to do is keep moving towards them.",
];

const Home = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("It is never too late to be what you might have been.");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); // State variable for loading indicator
  const [isHomeScreen, setIsHomeScreen] = useState(false);

  useEffect(() => {
    const ref = setInterval(() => {
      setText(sample(quotes));
    }, 6500);

    return () => clearInterval(ref);
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUsername(doc.data().username);
          setLoading(false); 
        });
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const navigateToChatBotScreen = () => {
    navigation.navigate("ChatBotScreen");
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsHomeScreen(true);

      return () => {
        setIsHomeScreen(false);
      };
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      if (isHomeScreen) {
        BackHandler.exitApp();
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isHomeScreen]);

  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <View style={{
          backgroundColor: "#0096FF",
          height: "28%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20
        }}>
          <TouchableOpacity onPress={openDrawer}>
            <Image
              source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\1.png')}
              style={{
                height: 10,
                width: 20,
                marginTop: 50
              }}
            />
          </TouchableOpacity>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            width: "100%"
          }}>
            <View style={{ width: "50%" }}>
              {loading ? (
                <View style={styles.loadingIndicator}>
                  <ActivityIndicator size="small" color="#FFF" />
                </View>
              ) : (
                <Text style={{
                  fontSize: 28,
                  color: "#FFF",
                  fontWeight: "bold"
                }}>Hi {username}</Text>
              )}
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Image
                source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\iconBotHome.png')}
                style={{ height: 60, width: 60 }}
              />
            </View>
          </View>
        </View>
        <LinearGradient
          colors={["#0096FF", "transparent"]}
          style={{
            left: 0,
            right: 0,
            height: 90,
            marginTop: -45
          }}>
          <View style={{
            backgroundColor: "#FFF",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginVertical: 2,
            marginHorizontal: 20,
            borderRadius: 15,
            marginTop: 1,
            flexDirection: "row",
            alignItems: "center"
          }}>
            <AnimatedText style={styles.quote} text={text} />
          </View>
        </LinearGradient>

        <View style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          width: "100%",
          alignItems: "center"
        }}>
          <View style={{ width: "50%" }}>
            <Text style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
              marginTop: 15
            }}>Get Started</Text>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <View style={{
              backgroundColor: "#0096FF",
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 15,
              marginTop: 15
            }}>
              <Text style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#FFF"
              }}>More</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={navigateToChatBotScreen}
            >
              <Image
                source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\chatWithBot.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Chat with bot</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => navigation.navigate("DiscoverChat")}
            >
              <Image
                source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\discoverPeople.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Discover People</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => navigation.navigate("ActivitiesScreen")}
            >
              <Image
                source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\activities.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Activities</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => navigation.navigate("LocationScreen")}
            >
              <Image
                source={require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\findFriends.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Nearby Consultants</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#0096FF',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home Drawer"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Rate US"
        component={RateUsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="star-half" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={RateUs}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default App;
