import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Linking  } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "../../services/GooglePlaceApi";
import { Colors } from "../../constants/Colors";

// Define the dummy image URL
const DUMMY_IMAGE = require("./../../assets/images/pexel.jpg");

export default function HotelCards({ item }) {
  const [photoRef, setPhotoRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useDummyImage, setUseDummyImage] = useState(false);

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    try {
      const result = await GetPhotoRef(item.name);
      if (result) {
        setPhotoRef(result);
      } else {
        setUseDummyImage(true);
      }
    } catch (error) {
      console.log(item?.location?.name+"photo reference not found:", error);
      //console.error("Error fetching photo reference:", error);
      setUseDummyImage(true);
    } finally {
      setLoading(false);
    }
  };


  const handlePress = () => {
    if (item?.geoCoordinates) {
      const coordinates = item.geoCoordinates;
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
    Linking.openURL(url);
    } else {
      console.log('GeoCoordinates are not available');
    }
  };

  return (
    <View
      style={{
        marginRight: 5,
        borderRadius: 20,
        alignItems: "center",
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
          <TouchableOpacity onPress={handlePress}>
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
                  {item?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "outfit",
                    color: Colors.WHITE,
                  }}
                >
                  💰{item?.price}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "outfit",
                    color: Colors.WHITE,
                    paddingRight: 12,
                  }}
                >
                  ⭐{item?.rating}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
}
