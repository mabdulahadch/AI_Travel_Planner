import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons2 from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function reviewTrip() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  return (
    <View
      style={{
        padding: 25,
        paddingTop: 45,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: "auto" }}
        >
          <Ionicons2 name="chevron-back-outline" size={27} color="black" />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            flex: 1,
            textAlign: "center",
          }}
        >
          Review your Trip
        </Text>
      </View>

      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
            paddingTop: 30,
            textAlign: "center",
          }}
        >
          Before generating your Trip, please review your selection
        </Text>
      </View>

      {/*Location */}
        <View
          style={{
            padding: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: Colors.GREY,
            borderRadius:15
          }}
        >
          <View
            style={{
              paddingRight: 40,
            }}
          >
            <Image
              source={require("./../../assets/images/google-maps.png")}
              style={{
                height: 40,
                width: 40,
              }}
            ></Image>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
                color: Colors.GREY,
              }}
            >
              Location
            </Text>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
                paddingRight: 40,
                color: Colors.PRIMARY,
              }}
            >
              {tripData?.startlocationInfo?.name+" - "+tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

      {/*Travel Date */}
      <View
          style={{
            padding: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: Colors.GREY,
            borderRadius:15

          }}
        >
          <View
            style={{
              paddingRight: 40,
            }}
          >
            <Image
              source={require("./../../assets/images/calendar.png")}
              style={{
                height: 40,
                width: 40,
              }}
            ></Image>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
                color: Colors.GREY,
              }}
            >
              Travel Dates
            </Text>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
                //paddingTop: 5,
                color: Colors.PRIMARY,
              }}
            >
              {tripData?.sDate+" - "+tripData?.eDate+" ("+tripData?.diff+" days)"}
            </Text>
          </View>
        </View>

      {/*Who's Travelling */}
      <View
          style={{
            padding: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: Colors.GREY,
            borderRadius:15

          }}
        >
          <View
            style={{
              paddingRight: 40,
            }}
          >
            <Image
              source={require("./../../assets/images/persons.png")}
              style={{
                height: 40,
                width: 40,
              }}
            ></Image>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
                color: Colors.GREY,
              }}
            >
              Who's Travelling
            </Text>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
                //paddingTop: 5,
                color: Colors.PRIMARY,
              }}
            >
              {tripData?.travelerCount?.title}
            </Text>
          </View>
        </View>

      {/*Budget */}
      <View
          style={{
            padding: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: Colors.GREY,
            borderRadius:15

          }}
        >
          <View
            style={{
              paddingRight: 40,
            }}
          >
            <Image
              source={require("./../../assets/images/moneybag.png")}
              style={{
                height: 40,
                width: 40,
              }}
            ></Image>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
                color: Colors.GREY,
              }}
            >
              Budget
            </Text>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
                //paddingTop: 5,
                color: Colors.PRIMARY,
              }}
            >
              {tripData?.budgetType}
            </Text>
          </View>

          
        </View>


      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/create-trip/generateTrip')}
      >
        <Text style={styles.buttonText}>Generate my Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "outfit-medium",
  },
});
