import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";

import { auth, db } from "../../configs/firebaseConfig";
import { useRouter } from "expo-router";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import Fav from "./../../component/Favorite/fav";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function Favorites() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const unsubscribe = GetMyTrips();
      return () => unsubscribe(); // Clean up the listener when component unmounts
    }
  }, [user]);

  const GetMyTrips = () => {
    setLoading(true);

    // Clear previous user trips
    setUserTrips([]);

    // Query to get data from Firestore
    const q = query(
      collection(db, "UserTrip"),
      where("userEmail", "==", user?.email)
    );

    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
      setLoading(false);
    });

    // Clean up the subscription when the component is unmounted
    return () => unsubscribe();
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 35,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 33,
          }}
        >
          Favorites
        </Text>

        <Text
          style={{
            fontSize: 17,
            fontFamily: "outfit-medium",
            color: Colors.GREY,
            paddingTop: 3,
          }}
        >
          Your favorite trips
        </Text>
      </View>

      <Ionicons name="heart-outline" size={33} color="black" paddingTop={5} />
      </View>

        <FlatList
          style={{
          }}
          showsVerticalScrollIndicator={false}
          data={userTrips}
          renderItem={({ item, index }) => <Fav item={item} />}
        />
    </View>
  );
}
