import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { GetPhotoRef } from "../../services/GooglePlaceApi";

const DUMMY_IMAGE = require("./../../assets/images/pexel.jpg");

export default function DayPlanCard({ item }) {
  const [photoRef, setPhotoRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useDummyImage, setUseDummyImage] = useState(false);

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    try {
      const result = await GetPhotoRef(item?.location?.name);
      if (result && typeof result === "string") {
        setPhotoRef(result);
      } else {
        setUseDummyImage(true);
      }
    } catch (error) {
      console.log(item?.location?.name + "photo reference not found:", error);
      setUseDummyImage(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = () => {

    if (item?.location?.geoCoordinates) {
      const coordinates = item.location.geoCoordinates;
      const url = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
      //console.log(item.location.geoCoordinates);

      Linking.openURL(url);
    } else {
      console.log("GeoCoordinates are not available");
    }
  };

  return (
    <View
      style={{
        borderRadius: 20,
        paddingTop: 10,
        paddingRight: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.PRIMARY,
          }}
        >
          Day {item?.day}
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit",
            color: Colors.GREY,
            paddingRight: 5,
          }}
        >
          {item?.timestamp}
        </Text>
      </View>

      {loading ? (
        <View
          style={{
            width: 330,
            height: 220,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.WHITE,
            borderRadius: 20,
          }}
        >
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
        <ImageBackground
          borderRadius={20}
          source={
            useDummyImage || !photoRef
              ? DUMMY_IMAGE
              : {
                  uri:
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                    photoRef +
                    "&key=" +
                    process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                }
          }
          style={{
            width: 330,
            height: 220,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity onPress={handlePress}>
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: adds a semi-transparent background to the text
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
                    paddingRight: 50,
                  }}
                >
                  {item?.location?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "outfit",
                    color: Colors.WHITE,
                  }}
                >
                  {item?.location?.details}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
}
