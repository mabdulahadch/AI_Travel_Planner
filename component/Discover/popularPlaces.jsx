import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Linking  } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "../../services/GooglePlaceApi";
import { Colors } from "../../constants/Colors";

const DUMMY_IMAGE = require("./../../assets/images/pexel.jpg");

export default function popularPlaces({ item }) {

  const [photoRef, setPhotoRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useDummyImage, setUseDummyImage] = useState(false);

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    try {
      const result = await GetPhotoRef(item);
      if (result) {
        setPhotoRef(result);
      } else {
        setUseDummyImage(true);
      }
    } catch (error) {
      console.log(item+ "photo reference not found:", error);
      //console.error("Error fetching photo reference:", error);
      setUseDummyImage(true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View
    style={{
      borderRadius: 20,
      alignItems: "center",
      paddingBottom:5,
    }}
  >
    {loading ? (
      <View
        style={{
          width: 330,
          height: 220,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.WHITE, // Optional: you can set a background color during loading
          borderRadius: 20,
        }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    ) : (
      <ImageBackground
        borderRadius={20}
        source={
          useDummyImage
            ? DUMMY_IMAGE
            : {
                uri:
                  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
                  photoRef + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              }
        }
        style={{
          width: 330,
          height: 220,
          justifyContent: "flex-end", // centers text vertically
        }}
      >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)", // Optional: adds a semi-transparent background to the text
              padding: 5,
              paddingBottom: 12,
              paddingLeft: 12,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-bold",
                  color: Colors.WHITE,
                  paddingRight: 10,
                }}
              >
                {item}
              </Text>
             
            </View>
          </View>
      </ImageBackground>
    )}
  </View>
  );
}
