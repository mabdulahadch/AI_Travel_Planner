import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Colors } from "../../constants/Colors";
import Ionicons2 from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

import { SelectTravelerList } from "./../../constants/option";
import OptionCard from "../../component/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function selectTraveler() {
  const router = useRouter();
  const [travellingSelection, settravellingSelection] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    setTripData({
      ...tripData,
      travelerCount: travellingSelection,
    });
  }, [travellingSelection]);

  // useEffect(()=>{
  //   console.log(tripData);
  // },[tripData]);

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
          Who's travelling ?
        </Text>
      </View>

      <View>
        <FlatList
          data={SelectTravelerList}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => settravellingSelection(item)}>
              <OptionCard
                option={item}
                selectedOption={travellingSelection}
              />
            </TouchableOpacity>
          )}
        />

        {travellingSelection && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/create-trip/selectDates")}
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
    marginTop: "10%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "outfit-medium",
  },
});
