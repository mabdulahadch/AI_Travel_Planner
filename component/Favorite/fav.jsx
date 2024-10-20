import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function fav({ item }) {
  const photoUri = item?.trip_Data?.locationInfo?.photoRef
    ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
      item?.trip_Data?.locationInfo?.photoRef +
      "&key=" +
      process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
    : require("./../../assets/images/people.jpg"); // Provide a fallback image path



  return (
    <View
      style={{
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: Colors.GREY,
        marginBottom:5,
      }}
    >
      {/* <View>
        {item.favorite && <Text>{item?.trip_Data?.locationInfo?.name}</Text>}
      </View> */}

      {item.favorite && <ImageBackground
        source={typeof photoUri === "string" ? { uri: photoUri } : photoUri}
        style={{
        //   width: "100%",
        //   height: 200,
        
        width: '100%',
        height: 220,
          justifyContent: "flex-end", // centers text vertically
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: adds a semi-transparent background to the text
            padding: 5,
            //marginLeft:5,
            paddingBottom: 10,
            paddingLeft: 12,

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
              {item?.trip_Data?.locationInfo?.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "outfit",
                color: Colors.WHITE,
              }}
            >
              📅 {item?.trip_Data?.sDate + " / " + item?.trip_Data?.eDate}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "outfit",
                color: Colors.WHITE,
              }}
            >
              {item?.trip_Data?.travelerCount?.icon}{" "}
              {item?.trip_Data?.travelerCount?.title}
            </Text>
          </View>
        </View>
      </ImageBackground>}
    </View>
  );
}
