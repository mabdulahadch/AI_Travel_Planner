import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons2 from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import DatePicker from "react-native-date-ranges";
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from "moment";

export default function SelectDates() {
  const router = useRouter();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [difference, setDifference] = useState();

  const { tripData, setTripData } = useContext(CreateTripContext);

  const updateDateRange = (dates) => {
    const { startDate, endDate } = dates;

    if (startDate && endDate) {
      const start = moment(startDate, "DD-MMM");
      const end = moment(endDate, "DD-MMM");
      const diffDays = end.diff(start, "days");

      // Update state
      setStartDate(start.format("DD-MMM"));
      setEndDate(end.format("DD-MMM"));
      setDifference(diffDays);

      // Update context data
      setTripData({
        ...tripData,
        sDate: start.format("DD-MMM"),
        eDate: end.format("DD-MMM"),
        diff: diffDays,
      });
    } else {
      console.log("Invalid date selection");
    }
  };

  const onClickEvent = (dates) => {
    updateDateRange(dates);
  };
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
          Travel Dates?
        </Text>
      </View>

      <View style={{ paddingTop: 40 }}>
        <DatePicker
          style={{
            width: "100%",
            height: 50,
            borderWidth: 1,
          }}
          customStyles={{
            placeholderText: {
              fontSize: 15,
              color: "black",
              fontFamily: "outfit-medium",
            }, // Placeholder text in black
            headerStyle: { backgroundColor: Colors.WHITE, marginTop: "20%" }, // Header background color
            headerMarkTitle: { color: "white" }, // Title mark color
            headerDateTitle: {
              color: Colors.PRIMARY,
              fontFamily: "outfit-medium",
            }, // Date title color
          }}
          ButtonStyle={{
            backgroundColor: "black",
            padding: 15,
            width: "90%",
            borderRadius: 35,
            alignItems: "center",
            fontFamily: "outfit",
            justifyContent: "center",
          }}
          ButtonTextStyle={{
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
          }}
          placeholder={"click me !"}
          mode={"range"}
          selectedBgColor={"black"}
          blockBefore={"false"}
          dateSplitter={"-to-"}
          headFormat={"DD-MMM"}
          returnFormat={"DD-MMM"}
          ButtonText={"Save"}
          onConfirm={onClickEvent}

          // onConfirm={(Date) => {
          //   console.log("Selected dates: ", Date);
          // }}
        />
      </View>
      <View>
        {startDate && endDate && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/create-trip/selectBudget")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: "5%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "outfit-medium",
  },
});
