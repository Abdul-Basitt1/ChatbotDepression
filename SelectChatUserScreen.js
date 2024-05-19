import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SelectChatUserScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '!=', '')); // exclude users with empty username
      const snapshot = await getDocs(q);
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleUserPress = (user) => {
    // Navigate to the chat screen with the selected user's ID
    navigation.navigate('DiscoverPeopleChat', { otherUserId: user.id });
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userCard} onPress={() => handleUserPress(item)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.username}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={renderUserItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectChatUserScreen;
