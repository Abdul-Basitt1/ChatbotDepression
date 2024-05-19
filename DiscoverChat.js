import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { collection, addDoc, getFirestore, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from './FirebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

const DiscoverChat = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSendButtonDisabled, setSendButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading state
  const flatListRef = useRef(null);
  const prohibitedWords = ['Kill', 'Kill yourself', 'Fuck', 'You are useless']; // Update with actual prohibited words

  useEffect(() => {
    const fetchMessages = async () => {
      const db = getFirestore();
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ id: doc.id, ...doc.data() });
        });
        setMessages(fetchedMessages);
        setLoading(false); // Mark loading as false once messages are fetched
      });
      return unsubscribe;
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (isMessageProhibited(message)) {
      Alert.alert('Warning', 'Your message contains prohibited words.');
      return;
    }

    try {
      const db = getFirestore();
      await addDoc(collection(db, 'messages'), {
        text: message,
        sender: auth.currentUser.displayName,
        timestamp: new Date().toISOString(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const isMessageProhibited = (message) => {
    const words = message.toLowerCase().split(' ');
    return words.some(word => prohibitedWords.includes(word));
  };

  const renderMessageBubble = ({ item }) => {
    // Extracting time portion from timestamp
    const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={[styles.messageBubble, isCurrentUser(item.sender) ? styles.currentUserMessage : styles.otherUserMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <View style={styles.senderTimeContainer}>
          <Text style={styles.senderText}>{item.sender}</Text>
          <Text style={styles.timestampText}>{time}</Text>
        </View>
      </View>
    );
  };

  const isCurrentUser = (sender) => {
    return sender === auth.currentUser.displayName;
  };

  const handleSendMessage = () => {
    if (isSendButtonDisabled) {
      Alert.alert('Warning', 'Your messaging has been disabled for 24hrs.');
      return;
    }

    sendMessage();
    if (isMessageProhibited(message)) {
      setSendButtonDisabled(true);
      setTimeout(() => {
        setSendButtonDisabled(false);
      }, 86400000); // 24 hours in milliseconds
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/ChatDiscBg.jpeg')} style={styles.backgroundImage}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Discover People</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageBubble}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSendMessage} style={[styles.sendButton, isSendButtonDisabled && styles.disabledSendButton]}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          // Translucent overlay for loading indicator
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0096FF" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0096FF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginRight: 16,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    paddingTop: 15,
    paddingLeft: 40,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0096FF',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDDDDD',
  },
  messageText: {
    color: 'black',
    fontSize: 16,
  },
  senderTimeContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  senderText: {
    fontSize: 12,
    marginRight: 8,
  },
  timestampText: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  sendButton: {
    backgroundColor: '#0096FF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledSendButton: {
    backgroundColor: '#CCCCCC',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Covering entire parent
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Translucent overlay color
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DiscoverChat;
