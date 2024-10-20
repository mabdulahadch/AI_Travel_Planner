import { View, Text, StyleSheet, TouchableOpacity,Linking  } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function flightDetail({ flightData }) {

  const handlePress = () => {
    if (flightData?.bookingURL) {
      //console.log(flightData.bookingURL);
      Linking.openURL(flightData.bookingURL);
    } else {
      console.log('Booking URL is not available');
    }
  };
  return (
    <View
      style={{
        height: 235,
        borderTopWidth: 0.4,
        borderColor: Colors.GREY,
        paddingTop: 10,
        backgroundColor:Colors.WHITE
      }}
    >
      <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
      }}>
      <Text style={styles.heading1}>✈️ Flight Details</Text>

      <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading2}>Airline:</Text>
      <Text style={styles.heading3}>{flightData?.name}</Text>

      <Text style={styles.heading2}>Departure Airport:</Text>
      <Text style={styles.heading3}>{flightData?.departureAirport}</Text>

      <Text style={styles.heading2}>Arrival Airport:</Text>
      <Text style={styles.heading3}>{flightData?.arrivalAirport}</Text>

      <Text style={styles.heading2}>Flight Price:</Text>
      <Text style={styles.heading3}>{flightData?.price}</Text>

      

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
  button: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "outfit-medium",
    
    paddingLeft:10,
    paddingRight:10,
  },
});
