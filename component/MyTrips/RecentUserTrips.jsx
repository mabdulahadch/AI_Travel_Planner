import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function RecentUserTrips({ trip }) {
    const router=useRouter();
  return (
     
        <TouchableOpacity 
        onPress={() => router.push({pathname:'/tripDetails/detail',params:{
          trip:JSON.stringify(trip)
         }})}
          style={{
            //backgroundColor: "rgba(0, 0, 0, .7)", // Optional: adds a semi-transparent background to the text
            //padding: 10,
            //paddingLeft: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            //justifyContent: 'space-between',
            //borderRadius: 20,
            //overflow: "hidden",
            //backgroundColor: Colors.Light_GREY,
            marginTop: 5,
            //borderWidth: 1,
            //borderColor: Colors.GREY,
          }}
        >
            <Image
              //source={require("./../../assets/images/loginimage.jpeg")}
              source={{
                uri:
                  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
                  encodeURIComponent(trip?.trip_Data?.locationInfo?.photoRef) +
                  '&key=' +
                  process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              }}
              style={{
                width: 165,
                height: 100,
                borderRadius:15,
                //justifyContent: 'space-between', // centers text vertically
                //alignItems: "center", // centers text horizontally
              }}
            ></Image>

          <View style={{
                paddingLeft:15,
              }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "outfit-medium",
                color: Colors.PRIMARY,
                paddingRight:170,
               // backgroundColor:Colors.Light_GREY
              }}
            >
              {trip?.trip_Data?.locationInfo?.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "outfit",
                color: Colors.PRIMARY,
              }}
            >
              📅 {trip?.trip_Data?.sDate + " / " + trip?.trip_Data?.eDate}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "outfit",
                color: Colors.PRIMARY,
              }}
            >
              {trip?.trip_Data?.travelerCount?.icon}{" "}
              {trip?.trip_Data?.travelerCount?.title}
            </Text>
          </View>

        </TouchableOpacity>
  );
}
