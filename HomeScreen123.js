// import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import ScreenWrapper from '../components/screenWrapper'
// import { colors } from '../theme'
// import randomImage from '../assets/images/randomImage';
// import EmptyList from '../components/emptyList';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { signOut } from 'firebase/auth';
// import { auth, tripsRef } from '../config/firebase';
// import { useSelector } from 'react-redux';
// import { getDoc, getDocs, query, where } from 'firebase/firestore';

// const items = [
//     {
//       id: 1, 
//       place: 'Gujrat', 
//       country: 'Pakistan'
//     },
//     {
//       id: 2, 
//       place: 'London Eye',
//       country: 'England',
//     },
//     {
//       id: 3, 
//       place: 'Washington dc',
//       country: 'America',
//     },
//     {
//       id: 4, 
//       place: 'New york',
//       country: 'America'
//     }
// ]

// export default function HomeScreen() {
//     const navigation = useNavigation();

//     const {user} = useSelector(state => state.user);
//     const [trips, setTrips] = useState(items);

//     const isFocused = useIsFocused();

//     const fetchTrips = async () => {
//         const q = query(tripsRef, where("userId", "==", user.uid));
//         const querySnapshot = await getDocs(q);
//         let data = [];
//         querySnapshot.forEach(doc => {
//             data.push({ ...doc.data(), id: doc.id })
//         })
//         setTrips(data);
//     }

//     useEffect(() => {
//         if (isFocused)
//             fetchTrips();
//     }, [isFocused])

//     const handleLogout = async () => {
//         await signOut(auth);
//     }

//     return (
//         <ScreenWrapper style={{ flex: 1 }}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
//                 <Text style={{ color: colors.heading, fontWeight: 'bold', fontSize: 24, textShadowColor: 'black', textShadowRadius: 1 }}>Expensify</Text>
//                 <TouchableOpacity onPress={handleLogout} style={{ padding: 2, paddingHorizontal: 3, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray', borderRadius: 999 }}>
//                     <Text style={{ color: colors.heading }}>Logout</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderRadius: 20, marginHorizontal: 4, marginBottom: 4 }}>
//                 <Image source={require('../assets/images/banner.png')} style={{ width: 180, height: 180 }} />
//             </View>
//             <View style={{ paddingHorizontal: 4, marginVertical: 3 }}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Text style={{ color: colors.heading, fontWeight: 'bold', fontSize: 20 }}>Recent Trips</Text>
//                     <TouchableOpacity
//                         onPress={() => navigation.navigate('AddTrip')}
//                         style={{ padding: 2, paddingHorizontal: 3, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray', borderRadius: 999 }}>
//                         <Text style={{ color: colors.heading }}>Add Trip</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{ height: 430 }}>
//                     <FlatList
//                         data={trips}
//                         numColumns={2}
//                         ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet"} />}
//                         keyExtractor={item => item.id}
//                         showsVerticalScrollIndicator={false}
//                         columnWrapperStyle={{
//                             justifyContent: 'space-between'
//                         }}
//                         style={{ margin: 1 }}
//                         renderItem={({ item }) => {
//                             return (
//                                 <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', { ...item })} style={{ backgroundColor: 'white', padding: 3, borderRadius: 20, marginBottom: 3, shadowRadius: 2 }}>
//                                     <View>
//                                         <Image source={randomImage()} style={{ width: 120, height: 120, marginBottom: 2 }} />
//                                         <Text style={{ color: colors.heading, fontWeight: 'bold' }}>{item.place}</Text>
//                                         <Text style={{ color: colors.heading, fontSize: 12 }}>{item.country}</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             )
//                         }}
//                     />
//                 </View>
//             </View>
//         </ScreenWrapper>
//     )
// }
