import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";
import DayPlanCard from "./dayPlanCard"


export default function DayPlans({ dayPlanData }) {
  // Get unique days from dayPlanData
  const uniqueDays = [...new Set(dayPlanData.map((item) => item.day))];

  return (
    <View style={{ backgroundColor: Colors.WHITE }}>
      <Text style={styles.heading1}>🌞 Daily Plans</Text>

      {uniqueDays.map((day) => {
        const dayData = dayPlanData.filter((item) => item.day === day);

        return (
          <FlatList
            key={`day-${day}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={335} // width + marginRight
            decelerationRate="fast" // Optional: for quicker snapping
            data={dayData}
            renderItem={({ item, index }) => (

              <DayPlanCard item={item}/>

            )}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  heading1: {
    fontFamily: "outfit-bold",
    fontSize: 26,
  },
});
