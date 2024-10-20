import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import HotelCards from "./hotelCards"

export default function hotelDetail({ hotelData }) {
 
 
  return (
    <View
      style={{
        height: 280,
        borderTopWidth: 0.4,
        borderColor: Colors.GREY,
        paddingTop: 10,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Text style={styles.heading1}>🏨 Hotel Recommendations</Text>

      <FlatList
        style={{
          marginTop: 10,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={335} // width + marginRight
        decelerationRate="fast" // Optional: for quicker snapping
        data={hotelData}
        renderItem={({ item, index }) => (

            <HotelCards item={item}/>
          
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading1: {
    fontFamily: "outfit-bold",
    fontSize: 26,
  },
  heading2: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    color: Colors.GREY,
  },
  heading3: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    paddingLeft: 20,
  },
});
