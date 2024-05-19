import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import { Ubuntu_300Light, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { KdamThmorPro_400Regular } from '@expo-google-fonts/kdam-thmor-pro';
//import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
//import LoginScreen from './LoginScreen'

//const navigation = useNavigation();
const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    "key": "3571572",
    "title": "Welcome to Stress Less!",
    "description": "Welcome to your 24/7 stress relief companion. Stressed students, unite and let's chat away your worries together!😊 ",
    "image":  require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Pic1.png')
  },
  {
    "key": "3571747",
    "title": "Connect with Fellow users!",
    "description": "Struggling with social anxiety? Our 'Social Support Chat' connects you with others for shared experiences and support.!",
    "image":  require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\MidPic.png')
  },
  {
    "key": "3571680",
    "title": "Feel free to express yourself!",
    "description": "TYour digital de-stresser is just a chat away, creating your stress-free zone to conquer those worries together. Let's chat, share, and chase away the burdens that have been weighing you down. ",
    "image":  require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Pic.png')
  },
  {
    "key": "3571603",
    "title": "Let's get started!",
    "description": "Unlock the door to stress relief and join the stress-busting community. Sign up now to get started on your journey towards a calmer, happier you!",
    "image":  require('C:\\Users\\abdul\\OneDrive\\Desktop\\ChatbotDepression - Copy\\assets\\Pic4.png')
  }
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 50, flexDirection: 'row' }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indiction-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              opacity,
              backgroundColor: '#fff',
              margin: 10,
              transform: [
                {
                  scale,
                }
              ]
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        }
      ]}
    />
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(Animated.divide(
    Animated.modulo(scrollX, width),
    new Animated.Value(width)
  ), 1);

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg']
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0]
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Onboard = () => {
  const navigation = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular, 
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    KdamThmorPro_400Regular,
  });

  if(!fontsLoaded){
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item, index}) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: 'center' }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text style={{ color: '#fff', fontSize: 28, marginBottom: 10, fontFamily: "KdamThmorPro_400Regular" }}>{item.title}</Text>
                <Text style={{ fontSize: 15 ,fontFamily: "Ubuntu_400Regular"}}>{item.description}</Text>
                {index === DATA.length - 1 && (
                  <View>
                    <TouchableOpacity 
                    style={styles.signupButton} 
                    disabled={currentIndex !== index} 
                    onPress={() => navigation.navigate("SignupScreen")}
                    >
                    <Text style={{ color: 'white', fontSize: 16 }}>Signup</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity styles={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate()}>
                      <Text >Already have an account?</Text>
                      <Text styles={{color: "B80000"}}>Login</Text>
                    </TouchableOpacity> */}

                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

// const handleSignup = () => {
//   const navigation = useNavigation();
//   navigation.navigate('SignupScreen');
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButton: {
    marginTop: 25, // Adjust the margin to bring the button down
    borderRadius: 25, // Make the button round from corners
    backgroundColor: '#756AB6', // You can customize the background color
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
});

export default Onboard;
