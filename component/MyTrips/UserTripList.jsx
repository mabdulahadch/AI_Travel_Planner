import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import Ionicons2 from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native";
import RecentUserTrips from "./RecentUserTrips";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
export default function UserTripList({ userTrips }) {


  const router = useRouter();

  // Safely parse trip_Data, with a fallback for undefined or invalid JSON
  //const LatestTrip = userTrips[0]?.trip_Data;
  const LatestTrip = userTrips[userTrips.length - 1]?.trip_Data;


  const photoUri = LatestTrip?.locationInfo?.photoRef? 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + LatestTrip.locationInfo.photoRef + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY : require("./../../assets/images/people.jpg"); // Provide a fallback image path
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: Colors.GREY,
          marginTop: 10,
          //borderWidth: 1,
          //borderColor: Colors.PRIMARY,
        }}
      >
        
        
        <ImageBackground
          source={typeof photoUri === 'string' ? { uri: photoUri } : photoUri}
          style={{
            width: "100%",
            height: 200,
            justifyContent: "flex-end", // centers text vertically
          }}
        >
          
          <TouchableOpacity 
               onPress={() => router.push({pathname:'/tripDetails/detail',params:{
                trip:JSON.stringify(userTrips[userTrips.length - 1])
               }})}
            >
              
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: adds a semi-transparent background to the text
              padding:5,
              //marginLeft:5,
              paddingBottom:10,
              paddingLeft:12,


              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 23,
                  fontFamily: "outfit-bold",
                  color: Colors.WHITE,
                }}
              >
                {LatestTrip?.locationInfo?.name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "outfit",
                  color: Colors.WHITE,
                }}
              >
                📅 {LatestTrip?.sDate + " / " + LatestTrip?.eDate}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "outfit",
                  color: Colors.WHITE,
                }}
              >
                {LatestTrip?.travelerCount?.icon}{" "}
                {LatestTrip?.travelerCount?.title}
              </Text>
            </View>
            <Ionicons2
                name="chevron-forward-outline"
                size={25}
                color="white"
              />

            </View>
            </TouchableOpacity>
        </ImageBackground>
      </View>

      <Text
        style={{
          fontSize: 17,
          fontFamily: "outfit-medium",
          color: Colors.GREY,
          paddingTop: 5,
        }}
      >
        Recent Trips
      </Text>

      {userTrips.map((trip, index) => (
        <RecentUserTrips trip={trip} key={index}/>
      ))}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     padding: 20,
//     backgroundColor: Colors.GREY,
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//     fontFamily: "outfit-medium",
//   },
// });

// <View
// >
//   <TouchableOpacity
//     style={styles.button}
//     //onPress={() => router.replace('/create-trip/generateTrip')}
//   >
//     <Text style={styles.buttonText}>see my Trip</Text>
//   </TouchableOpacity>
// </View>
