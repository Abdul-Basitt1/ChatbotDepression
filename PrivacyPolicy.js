// PrivacyPolicyScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Privacy Policy</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.text}>
          [App Name] ("we", "us", "our") values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our app.
        </Text>

        <Text style={styles.sectionTitle}>Information Collection</Text>
        <Text style={styles.text}>
          We collect the following types of information:
        </Text>
        <Text style={styles.listItem}>- Personal Information: Name, email address, and any other information you provide.</Text>
        <Text style={styles.listItem}>- Usage Data: Information about how you use the app, including device information and IP address.</Text>

        <Text style={styles.sectionTitle}>Use of Information</Text>
        <Text style={styles.text}>
          We use your information to:
        </Text>
        <Text style={styles.listItem}>- Improve and personalize your experience.</Text>
        <Text style={styles.listItem}>- Communicate with you about updates and promotions.</Text>
        <Text style={styles.listItem}>- Analyze usage patterns to enhance our app.</Text>

        <Text style={styles.sectionTitle}>Information Sharing</Text>
        <Text style={styles.text}>
          We may share your information with:
        </Text>
        <Text style={styles.listItem}>- Service providers who assist us in operating the app.</Text>
        <Text style={styles.listItem}>- Legal authorities if required by law.</Text>

        <Text style={styles.sectionTitle}>Data Retention</Text>
        <Text style={styles.text}>
          We retain your information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
        </Text>

        <Text style={styles.sectionTitle}>Data Security</Text>
        <Text style={styles.text}>
          We implement various security measures to protect your data, including encryption and secure servers.
        </Text>

        <Text style={styles.sectionTitle}>User Rights</Text>
        <Text style={styles.text}>
          You have the right to access, update, or delete your personal information. Contact us at [contact email] to exercise these rights.
        </Text>

        <Text style={styles.sectionTitle}>Cookies</Text>
        <Text style={styles.text}>
          We use cookies to enhance your experience. You can control cookie preferences through your device settings.
        </Text>

        <Text style={styles.sectionTitle}>Children's Privacy</Text>
        <Text style={styles.text}>
          Our app is not intended for children under the age of [age]. We do not knowingly collect personal information from children.
        </Text>

        <Text style={styles.sectionTitle}>International Data Transfers</Text>
        <Text style={styles.text}>
          Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data.
        </Text>

        <Text style={styles.sectionTitle}>Changes to this Policy</Text>
        <Text style={styles.text}>
          We may update this policy from time to time. We will notify you of any changes by updating the effective date of this policy.
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns, please contact us at:
        </Text>
        <Text style={styles.text}>
          [Your Contact Information]
        </Text>
        <Text style={styles.text}>
          [Data Protection Officer Contact, if applicable]
        </Text>

        <Text style={styles.text}>
          By using our app, you consent to our Privacy Policy.
        </Text>
      </ScrollView>
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
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  content: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0096FF',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default PrivacyPolicyScreen;
