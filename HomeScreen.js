import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { sample } from 'lodash';
import { AnimatedText } from './AnimatedText';
import EmptyList from './emptyList';
import { styles } from './HomeScreenStyles';

const items = [
  {
    id: 1,
    place: 'Chat',
    image: require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Pic1.png'), 
  },
  {
    id: 2,
    place: 'Discover People',
    image: require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Pic1.png'), 
  },
  {
    id: 3,
    place: 'Find Friends',
    image: require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Pic1.png'), 
  },
  {
    id: 4,
    place: 'Activities',
    image: require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Pic1.png'), 
  },
];

const quotes = [
  "There is hope, even when your brain tells you there isn’t.",
  "And if today all you did was hold yourself together, I’m proud of you.",
  "Even the darkest hour only has 60 minutes.",
  "It is during our darkest moments that we must focus to see the light",
  "Be yourself; everyone is already taken", 
];
const Drawer = createDrawerNavigator();

const HomeScreenContent = ({ navigation }) => {
  const [text, setText] = useState('Hello there!');

  useEffect(() => {
    const ref = setInterval(() => {
      setText(sample(quotes));
    }, 6500);

    return () => clearInterval(ref);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}
        >
          <Text style={styles.headerText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Hi, Abdul</Text>
      </View>

      {/* Quotes Section */}
      <View style={styles.quoteContainer}>
        <AnimatedText style={styles.quote} text={text} />
      </View>

      {/* Other Sections */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Get Started</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")} style={styles.addButton}>
            <Text style={styles.headerText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          numColumns={2}
          ListEmptyComponent={<EmptyList message={"None"} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          style={styles.section}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ChatScreen")}
              style={styles.card}
            >
              <View>
                <Image source={item.image} style={styles.cardImage} />
                <Text style={styles.cardText}>{item.place}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerPosition="left">
      <Drawer.Screen
        name="Home"
        component={HomeScreenContent}
        options={{
          headerShown: false, // Hide the header for the content component
        }}
      />
      {/* Add more screens/options as needed */}
    </Drawer.Navigator>
  );
};