import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, setDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation and useRoute hooks

const DiscoverPeopleChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const { otherUserId } = route.params; // Get otherUserId from route.params
  const db = getFirestore();
  let unsubscribe;

  useEffect(() => {
    const fetchMessages = async () => {
      const conversationsRef = collection(db, 'conversations');
      const q = query(conversationsRef, where('participants', 'array-contains-any', [user.id, otherUserId]));

      try {
        const querySnapshot = await getDocs(q);
        const conversationDocs = querySnapshot.docs;

        if (conversationDocs.length > 0) {
          const conversationId = conversationDocs[0].id;
          const messagesRef = collection(db, 'conversations', conversationId, 'messages');

          unsubscribe = onSnapshot(messagesRef, snapshot => {
            const updatedMessages = snapshot.docs.map(doc => doc.data());
            setMessages(updatedMessages);
          });

          setLoading(false);
          setError(null);
        } else {
          setLoading(false);
          setError("No conversation found.");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    const conversationsRef = collection(db, 'conversations');
    const q = query(conversationsRef, where('participants', 'array-contains', user.id));
    const querySnapshot = await getDocs(q);
    const conversationDocs = querySnapshot.docs;

    let conversationId;
    if (conversationDocs.length === 0) {
      const newConversationRef = await addDoc(conversationsRef, { participants: [user.id, otherUserId] }); // Include both users in participants
      conversationId = newConversationRef.id;
    } else {
      conversationId = conversationDocs[0].id;
    }

    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const messageData = {
      senderId: user.id,
      text: messageText,
      timestamp: Timestamp.now(),
    };
    await addDoc(messagesRef, messageData);

    setMessageText('');
  };

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.sender}>{item.senderId}</Text>
      <Text style={styles.message}>{item.text}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessageItem}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  message: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DiscoverPeopleChatScreen;
