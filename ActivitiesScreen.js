import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ActivitiesScreen = ({ navigation }) => {
  const games = [
    {
      title: 'Subway Surfers',
      //description: 'Description for Game 1',
      image: require('./assets/game1.jpeg'),
      link: 'https://poki.com/en/g/subway-surfers'
    },
    {
      title: 'Duo Vikings',
      //description: 'Description for Game 2',
      image: require('./assets/duoVikings.jpeg'),
      link: 'https://poki.com/en/g/duo-vikings'
    },
    {
      title: 'Breakoid',
      //description: 'Description for Game 2',
      image: require('./assets/breakoid.jpeg'),
      link: 'https://poki.com/en/g/breakoid'
    },
    {
      title: 'Smash Karts',
      //description: 'Description for Game 2',
      image: require('./assets/smashKarts.jpeg'),
      link: 'https://poki.com/en/g/smash-karts'
    },
    {
      title: 'Blob Drop',
      //description: 'Description for Game 1',
      image: require('./assets/blobDrop.png'),
      link: 'https://poki.com/en/g/blob-drop'
    },
    {
      title: 'Monkey Mart',
      //description: 'Description for Game 2',
      image: require('./assets/monkeyMart.jpeg'),
      link: 'https://poki.com/en/g/monkey-mart'
    },
    {
      title: 'Battle Wheels',
      //description: 'Description for Game 2',
      image: require('./assets/battleWheels.jpeg'),
      link: 'https://poki.com/en/g/battle-wheels'
    },
    {
      title: 'Idle Ants',
      //description: 'Description for Game 2',
      image: require('./assets/idleAnts.jpeg'),
      link: 'https://poki.com/en/g/idle-ants'
    }
  ];

  const music = [
    {
      title: 'We Can Fly by Rue du Soleil',
      // description: 'Description for Music 1',
      image: require('./assets/music1.jpg'),
      link: 'https://www.youtube.com/watch?v=rbzuesSeDmQ'
    },
    {
      title: 'Canzonetta Sull’aria by Mozart',
      // description: 'Description for Music 2',
      image: require('./assets/betterPlace.jpg'),
      link: 'https://www.youtube.com/watch?v=Fc3fmSSUwck'
    },
    {
      title: 'Someone Like You by Adele',
      // description: 'Description for Music 2',
      image: require('./assets/demons.jpeg'),
      link: 'https://www.youtube.com/watch?v=NAc83CF8Ejk'
    },
    {
      title: 'Pure Shores by All Saints',
      // description: 'Description for Music 2',
      image: require('./assets/oceans.jpg'),
      link: 'https://www.youtube.com/watch?v=dVNdTXEJv1A'
    },
    {
      title: 'Please Don’t Go by Barcelona',
      // description: 'Description for Music 1',
      image: require('./assets/fixyou.jpg'),
      link: 'https://www.youtube.com/watch?v=COqx-TCxrSk'
    },
    {
      title: 'Strawberry Swing by Coldplay',
      // description: 'Description for Music 2',
      image: require('./assets/hero.jpeg'),
      link: 'https://www.youtube.com/watch?v=isH1yy8I_dc'
    },
    {
      title: 'Watermark by Enya',
      // description: 'Description for Music 2',
      image: require('./assets/betterDays.jpg'),
      link: 'https://www.youtube.com/watch?v=NO5tb20qQnA'
    },
    {
      title: 'Mellomaniac (Chill Out Mix) by DJ Shah',
      // description: 'Description for Music 2',
      image: require('./assets/search.jpeg'),
      link: 'https://www.youtube.com/watch?v=EcRXlM6edrM'
    }
  ];

  const renderCard = (item) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL(item.link)}
        key={item.title}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.button}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" /> 
        </TouchableOpacity>
        <Text style={styles.headerText}>Activities Corner</Text>
      </View>
      <ImageBackground source={require('./assets/ChatDiscBg.jpeg')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Games</Text>
            <View style={styles.section}>
              {games.map((game) => renderCard(game))}
            </View>
            <Text style={styles.sectionTitle}>Music</Text>
            <View style={styles.section}>
              {music.map((song) => renderCard(song))}
            </View>
          </View>
        </ScrollView>
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
    //alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    paddingLeft: 36,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    color: '#0096FF', // Updated color
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0096FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ActivitiesScreen;
