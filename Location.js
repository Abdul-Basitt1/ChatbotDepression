import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Animated, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      reverseGeocode(location.coords.latitude, location.coords.longitude);
      fetchNearbyPlaces(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    // Initial fade-in animation for the header
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const json = await response.json();
      const address = json.display_name;
      setAddress(address);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=10`);
      const json = await response.json();
      if (json.length > 0) {
        const { lat, lon } = json[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        // Update the region immediately
        setRegion({
          ...region,
          latitude,
          longitude,
        });

        // Fetch the address and update the location state
        reverseGeocode(latitude, longitude);
        setLocation({ coords: { latitude, longitude } });

        // Update nearby places based on the search result
        fetchNearbyPlaces(latitude, longitude);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchNearbyPlaces = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=psychologist,psychiatrist,mental+care+clinic,hospital&lat=${lat}&lon=${lon}&radius=5000&addressdetails=1`);
      const json = await response.json();
      setNearbyPlaces(json);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
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
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description={address}
          />
        )}
        {nearbyPlaces.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(place.lat),
              longitude: parseFloat(place.lon),
            }}
            title={place.display_name}
          />
        ))}
      </MapView>
      <View style={styles.locationContainer}>
        {location ? (
          <>
            <Text>Latitude: {location.coords.latitude}</Text>
            <Text>Longitude: {location.coords.longitude}</Text>
            <Text>Address: {address}</Text>
          </>
        ) : (
          <Text>Getting location...</Text>
        )}
        {errorMsg && <Text>Error: {errorMsg}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0096FF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 3,
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
    marginVertical: 10,
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
  locationContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
