import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState} from "react";
import { Colors } from "../../constants/Colors";
import Ionicons2 from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "./../../context/CreateTripContext";
//import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage


export default function SearchPlace() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  //const [recentSearches, setRecentSearches] = useState([]);


  // useEffect(() => {
  //   loadRecentSearches();
  // }, []);

  // useEffect(() => {
  //  console.log(tripData);
  // }, [tripData])
  

  // const loadRecentSearches = async () => {
  //   try {
  //     const savedSearches = await AsyncStorage.getItem("recentSearches");
  //     if (savedSearches) {
  //       setRecentSearches(JSON.parse(savedSearches));
  //     }
  //   } catch (error) {
  //     console.error("Failed to load recent searches", error);
  //   }
  // };

  // const saveSearch = async (place) => {
  //   try {
  //     let newRecentSearches = [place, ...recentSearches];
  //     // Limit to 5 recent searches
  //     if (newRecentSearches.length > 5) {
  //       newRecentSearches = newRecentSearches.slice(0, 5);
  //     }
  //     setRecentSearches(newRecentSearches);
  //     await AsyncStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
  //   } catch (error) {
  //     console.error("Failed to save search", error);
  //   }
  // };

  const handleStartLocationName = (data) => {
    const place = {
      name: data.description
    };

    setTripData({
      startlocationInfo: place,
    });
  };


  const handlePlacePress = (data, details = null) => {
    const place = {
      name: data.description,
      coordinates: details.geometry.location,
      photoRef: details.photos ? details.photos[0].photo_reference : null,
      url: details.url,
    };

    setTripData({
      ...tripData,
      locationInfo: place,
    });

    //saveSearch(place);
    
    router.push("/create-trip/selectTraveler");
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
          //style={{ marginRight: "auto" }}
        >
          <Ionicons2 name="chevron-back-outline" size={27} color="black" />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            flex: 1,
            textAlign:'center',
          }}
        >
          Search locations
        </Text>
      </View>

      <View   // Choose Start Location
        style={{
          paddingTop: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:'outfit'
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="choose start location"
          onPress={handleStartLocationName}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: "en",
          }}
          requestUrl={{
            url:
              "https://maps.googleapis.com/maps/api",
            useOnPlatform: "web",
          }}
          styles={{
            textInputContainer: {
              borderWidth: 1,
              borderRadius: 6,
              borderColor: Colors.GREY,
            },
            textInput: {
              fontFamily: "outfit",
              fontSize: 14,
              color:Colors.GREY,
            },
          }}
        />
      </View>
      
      <View   // Choose destination 
        style={{
          paddingTop: 10,
          flexDirection: "row",
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="choose destination"
          fetchDetails={true}
          onPress={handlePlacePress}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: "en",
          }}
          requestUrl={{
            url:
              "https://maps.googleapis.com/maps/api",
            useOnPlatform: "web",
          }}
          styles={{
            textInputContainer: {
              borderWidth: 1,
              borderRadius: 6,
              borderColor: Colors.GREY,
            },
            textInput: {
              fontFamily: "outfit",
              fontSize: 14,
              color:Colors.GREY,
              
            },
          }}
        />
      </View>

      {/* <View   // recent searches
      style={{ paddingTop: 10,
       }}>
        <Text style={{ 
          fontFamily: "outfit",
           fontSize: 18, 
           marginBottom: 10 
           }}>
          Recent Searches
        </Text>
        <FlatList
          data={recentSearches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentSearchItem}
              onPress={() => {
                setTripData({ locationInfo: item });
                
                router.push("/create-trip/selectTraveler");
                //console.log(item);
              }}
            >
              <Text style={{ 
                fontFamily: "outfit",
                 fontSize: 16 ,
                  color:Colors.GREY
                  }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View> */}

      <View
        style={{
          alignItems: "center",
          paddingTop:100
        }}
      >
        <Image 
            source={require('./../../assets/images/google-maps.png')}
            style={{
              height:150,
              width:150
      }}>

        </Image>
        <Text
          style={{
            paddingTop: 30,
            fontFamily: "outfit",
            fontSize: 15,
          }}
        >
          Search location using Google maps
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recentSearchItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GREY,
  },
});
