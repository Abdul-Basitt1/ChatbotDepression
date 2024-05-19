import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    ImageBackground,
    Alert,
    ActivityIndicator,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatBotScreen = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef(null);
    const username = "Abdul"; // Replace with actual logged-in username

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const storedMessages = await AsyncStorage.getItem('messages');
                if (storedMessages !== null) {
                    setMessages(JSON.parse(storedMessages));
                } else {
                    const initialMessage = { text: `Hi ${username}, how can I assist you today?`, isUser: false };
                    setMessages([initialMessage]);
                }
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        };
        loadMessages();
    }, []);

    useEffect(() => {
        const saveMessages = async () => {
            try {
                await AsyncStorage.setItem('messages', JSON.stringify(messages));
            } catch (error) {
                console.error('Error saving messages:', error);
            }
        };
        saveMessages();
    }, [messages]);

    const clearMessages = async () => {
        try {
            await AsyncStorage.removeItem('messages');
            setMessages([]);
        } catch (error) {
            console.error('Error clearing messages:', error);
        }
    };

    const sendMessage = (userInput) => {
        const newUserMessage = { text: userInput, isUser: true };
        const loadingMessage = { text: 'Loading...', isUser: false, loading: true };
        setMessages((prevMessages) => [...prevMessages, newUserMessage, loadingMessage]);
    };

    const sendTextToServer = async (text) => {
        setLoading(true);
        const url = 'http://192.168.10.4:5000/chat'; // Replace with your server URL
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: text, option: '2' }),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                setTimeout(() => {
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages];
                        const loadingIndex = updatedMessages.findIndex((msg) => msg.loading);
                        if (loadingIndex !== -1) {
                            updatedMessages[loadingIndex] = { text: jsonResponse.response, isUser: false };
                        }
                        return updatedMessages;
                    });
                }, 1000); // Simulate delay for demonstration
            } else {
                const errorResponse = await response.text();
                console.error('Server Error:', errorResponse);
                Alert.alert('Error', `Failed to send message to the server: ${errorResponse}`);
                setMessages((prevMessages) => prevMessages.filter((msg) => !msg.loading));
            }
        } catch (error) {
            console.error('Network or fetch error:', error);
            Alert.alert('Error', `Network error: ${error.message}`);
            setMessages((prevMessages) => prevMessages.filter((msg) => !msg.loading));
        } finally {
            setLoading(false);
        }
    };

    const renderMessage = ({ item }) => {
        const messageText = item.text;
        const messageComponents = [];

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        let lastIndex = 0;
        let match;

        while ((match = urlRegex.exec(messageText)) !== null) {
            const url = match[0];
            const startIndex = match.index;
            const endIndex = urlRegex.lastIndex;

            if (startIndex > lastIndex) {
                const beforeText = messageText.substring(lastIndex, startIndex);
                messageComponents.push(beforeText);
            }

            messageComponents.push(
                <Text key={url} style={styles.linkText} onPress={() => handleOpenURL(url)}>
                    {url}
                </Text>
            );

            lastIndex = endIndex;
        }

        if (lastIndex < messageText.length) {
            const remainingText = messageText.substring(lastIndex);
            messageComponents.push(remainingText);
        }

        return (
            <View style={item.isUser ? styles.userMessageContainer : styles.botMessageContainer}>
                <Text style={styles.messageText}>
                    {item.loading ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        messageComponents
                    )}
                </Text>
            </View>
        );
    };

    const handleOpenURL = (url) => {
        Linking.openURL(url);
    };

    const handleSignOut = async () => {
        await clearMessages();
    };

    const confirmClearChat = () => {
        Alert.alert(
            'Clear Chat',
            'Are you sure you want to clear the chat?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Clear',
                    onPress: () => clearMessages(),
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/ChatDiscbg2.jpeg')} style={styles.backgroundImage}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Stress less bot</Text>
                    <TouchableOpacity onPress={confirmClearChat} style={styles.trashButton}>
                        <Icon name="trash" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderMessage}
                    onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message..."
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, loading && styles.sendButtonDisabled]}
                        onPress={() => {
                            if (!loading && inputText.trim()) {
                                sendMessage(inputText);
                                sendTextToServer(inputText);
                                setInputText('');
                            }
                        }}
                        disabled={loading}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'space-between',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: {
        paddingTop: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        paddingTop: 16,
        paddingLeft: 2,
    },
    trashButton: {
        paddingTop: 21,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        marginVertical: 8,
        marginHorizontal: 16,
        maxWidth: '80%',
    },
    botMessageContainer: {
        alignSelf: 'flex-start',
        marginVertical: 8,
        marginHorizontal: 16,
        maxWidth: '80%',
    },
    messageText: {
        color: 'black',
        fontSize: 16,
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#DDDDDD',
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
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
    sendButtonDisabled: {
        opacity: 0.5,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
});

export default ChatBotScreen;
