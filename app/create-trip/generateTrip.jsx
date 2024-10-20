import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../constants/option";
import { chatSession } from "../../configs/AiModel";
import { useRouter } from "expo-router";
import { auth, db } from "./../../configs/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function GenerateTrip() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    generateAITrip();
  }, []);

  const generateAITrip = async () => {
    try {
      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace(
        "{startLocation}",
        tripData?.startlocationInfo?.name
      )
        .replace("{destinationLocation}", tripData?.locationInfo?.name)
        .replace("{totalDays}", tripData?.diff)
        .replace("{totalNights}", tripData?.diff - 1)
        .replace("{travelers}", tripData?.travelerCount?.title)
        .replace("{budget}", tripData?.budgetType)
        .replace("{startLocation}", tripData?.startlocationInfo?.name)
        .replace("{totalDays}", tripData?.diff)
        .replace("{totalNights}", tripData?.diff - 1);

      // Sending message to AI session
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      // Await the text() response and log it
      const responseText = await result.response.text();
      //console.log("Raw Response: ", responseText);

      const cleanedResponse = responseText.trim().replace(/[\r\n]/g, "");
      //console.log("cleanedResponse: ", cleanedResponse);

      let tripDataAfterResponse;
      try {
        tripDataAfterResponse = JSON.parse(cleanedResponse);
        //console.log("Parsed JSON: ", tripDataAfterResponse);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        setLoading(false);
        return; // Exit if JSON parsing fails
      }

      setLoading(false);

      // Generate unique docId
      const docId = Date.now().toString();
  
      // Add data to Firestore
      await setDoc(doc(db, "UserTrip", docId), {
        userEmail: user.email,
        trip_Plan: tripDataAfterResponse, // AI result
        trip_Data: tripData, // User selected data
        favorite: false,
        docId: docId,
      });
  
      // Navigate to home screen
      console.log("Trip plan has been generated");
      router.push("(tabs)/mytrip");
  
    } catch (error) {
      console.error("Error generating trip:", error);
      setLoading(false); // Stop loading in case of error
    }
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
          gap: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            paddingTop: 40,
            textAlign: "center",
          }}
        >
          Please Wait ...
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
            paddingTop: 20,
            textAlign: "center",
          }}
        >
          We are working to generate your dream trip
        </Text>

        <Image
          source={require("./../../assets/images/triploading.gif")}
          style={{
            width: "75%",
            height: 350,
          }}
        ></Image>

        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GREY,
            fontSize: 20,
            paddingTop: 20,
            textAlign: "center",
          }}
        >
          Please don't go back
        </Text>
      </View>
    </View>
  );
}
