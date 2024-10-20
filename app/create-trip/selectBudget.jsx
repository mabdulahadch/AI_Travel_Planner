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

import { SelectBudgetList } from "./../../constants/option";
import OptionCard from "../../component/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function selectBudget() {
  const router = useRouter();
  const [budgetSelection, setBudgetSelection] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    budgetSelection &&
      setTripData({
        ...tripData,
        budgetType: budgetSelection?.title,
      });
  }, [budgetSelection]);

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
          What's your Budget?
        </Text>
      </View>

      <View>
        <FlatList
          data={SelectBudgetList}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setBudgetSelection(item)}>
              <OptionCard option={item} selectedOption={budgetSelection} />
            </TouchableOpacity>
          )}
        />
      </View>

      {budgetSelection && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/create-trip/reviewTrip')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
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
