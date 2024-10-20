import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons2 from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, updateDoc } from "firebase/firestore"; // Use updateDoc instead of setDoc
import { db } from "./../../configs/firebaseConfig"; // Make sure auth import is removed if not used
import FlightDetail from "./flightDetail";
import HotelDetail from "./hotelDetail";
import DayPlan from "./dayPlans";

export default function Detail() {
  const { trip } = useLocalSearchParams();
  const fetchedTripData = JSON.parse(trip);
  const router = useRouter();

  // State for favorite selection

  const [isFavorite, setIsFavorite] = useState(fetchedTripData.favorite || false);

  const handleFavoriteToggle = () => {

    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    
    if (newFavoriteStatus) {
      ToastAndroid.show("This trip has been added to favorite", ToastAndroid.BOTTOM);
      
    }


    // Save the updated favorite status to Firestore
    saveFavInDB(newFavoriteStatus);
  };

  const saveFavInDB = async (favStatus) => {
    try {
      const tripRef = doc(db, "UserTrip", fetchedTripData.docId); // Ensure 'trips' is your collection name

      // Update the favorite field in Firestore
      await updateDoc(tripRef, {
        favorite: favStatus,
      });

      //console.log("Favorite status updated in Firestore:", favStatus);
    } catch (error) {
      console.error("Error updating favorite status in Firestore:", error);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <ImageBackground
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            encodeURIComponent(
              fetchedTripData?.trip_Data?.locationInfo?.photoRef
            ) +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          width: "100%",
          height: 200,
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <View
          style={{
            padding: 25,
            paddingTop: 45,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons2 name="chevron-back-outline" size={30} color="white" />
          </TouchableOpacity>

          {/* Heart Icon for Favorite */}
          <TouchableOpacity onPress={handleFavoriteToggle}>
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={27}
              color="white" // Keep the color white for both states
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View
        style={{
          backgroundColor: Colors.WHITE,
          paddingTop: 10,
          paddingRight: 25,
          paddingLeft: 25,
          height: "100%",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            color: Colors.PRIMARY,
            textAlign: "center",
          }}
        >
          {fetchedTripData?.trip_Data?.locationInfo?.name}
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            paddingTop: 5,
          }}
        >
          📅{" "}
          {fetchedTripData?.trip_Data?.sDate +
            " / " +
            fetchedTripData?.trip_Data?.eDate}
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            paddingTop: 5,
          }}
        >
          💷 {fetchedTripData?.trip_Data?.budgetType}
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            paddingTop: 5,
            paddingBottom: 10,
          }}
        >
          {fetchedTripData?.trip_Data?.travelerCount?.icon}{" "}
          {fetchedTripData?.trip_Data?.travelerCount?.title}
        </Text>

        {/* Flight Details */}
        <FlightDetail flightData={fetchedTripData?.trip_Plan?.flight} />

        {/* Hotel Details */}
        <HotelDetail hotelData={fetchedTripData?.trip_Plan?.hotels} />

        {/* Day plan Details */}
        <DayPlan dayPlanData={fetchedTripData?.trip_Plan?.dailyPlan} />
      </View>
    </ScrollView>
  );
}
