import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../component/MyTrips/StartNewTripCard";
import { onSnapshot,collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../configs/firebaseConfig";
import UserTripList from "../../component/MyTrips/UserTripList";
import { useRouter } from "expo-router";

export default function MyTrip() {
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 33,
          }}
        >
          My Trips
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "outfit-medium",
            color: Colors.GREY,
            paddingTop: 3,
          }}
        >
          AI planned trips
        </Text>
        </View>
        <TouchableOpacity
            onPress={() => router.push("/create-trip/searchPlace")}
        >
          <Ionicons name="add" size={35} color="black" paddingTop={5} />
        </TouchableOpacity>
      </View>



      {loading && <ActivityIndicator size={"large"} color={Colors.GREY} />}
      {
        userTrips?.length == 0 ? ( // check userTrip is having list or not
          <StartNewTripCard /> // if not -> show StartNewTripCard
        ) : (
          <UserTripList userTrips={userTrips} />
        ) // if yes -> show UserTripList
      }
    </View>
  );
}
