import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Animated, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const NearbyServices = ({navigation}) => {
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const markers = [
    { latitude: 33.78387048365384, longitude: 72.35815639349093, title: 'Physiotherapy', description: 'Dr. Noor' },
    { latitude: 33.786343253699265, longitude: 72.36688451641949, title: 'Khubaib Khalid Psychologist', description: 'Hope Couselling and therapy center' },
    { latitude: 33.78830664927129, longitude: 72.35902395038104, title: 'Clinical Psychologist', description: 'Dr. Shehla Pervez' }
  ];

  const initialRegion = {
    latitude: (33.78387048365384 + 33.786343253699265 + 33.78830664927129) / 3,
    longitude: (72.35815639349093 + 72.36688451641949 + 72.35902395038104) / 3,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.header, opacity: fadeAnim }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search Consultants</Text>
      </Animated.View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search location"
          placeholderTextColor="#0096FF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0096FF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    //alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    //justifyContent: 'center', // Center content horizontally
  },
  backButton: {
    marginRight: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    paddingTop: 15,
    paddingLeft: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#0096FF',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#0096FF',
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#0096FF',
    borderRadius: 20,
    padding: 8,
  },
  map: {
    flex: 1,
  },
});

export default NearbyServices;
