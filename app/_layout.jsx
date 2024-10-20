import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {CreateTripContext} from '../context/CreateTripContext'
import { useState } from "react";
import LoadingScreen from '../component/LoadingScreen'; // Import your custom loading screen

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
    'league':require('./../assets/fonts/LeagueScriptRegular.ttf'),
  })

  const [tripData,setTripData]=useState([]);
  if (!fontsLoaded) {
    return <LoadingScreen />; // Display a loading screen while the fonts are loading
  }
  return (
    <CreateTripContext.Provider value={{tripData,setTripData}}>
   <Stack screenOptions={{
      headerShown:false
      }}>
      {/* <Stack.Screen name="index" 
      options={{
        headerShown:false
        }}/> */}

      <Stack.Screen name="(tabs)"/>
    </Stack>
    </CreateTripContext.Provider>
  );
}
