import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "./../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import GoogleIcon from "@expo/vector-icons/Ionicons";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../../configs/firebaseConfig";
import { useState } from "react";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnCreateAccount = () => {
    if (!email && !password && !name) {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        router.replace('/mytrip');
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..

        if (errorCode == "auth/invalid-email") {
          ToastAndroid.show("Invalid Email", ToastAndroid.BOTTOM);
        } else if (errorCode == "auth/weak-password") {
          ToastAndroid.show(
            "Password should be at least 6 characters",
            ToastAndroid.BOTTOM
          );
        }
      });
  };
  return (
    <View
      style={{
        padding: 25,
        paddingTop: 30,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text
        style={{
          paddingTop: 20,
          fontFamily: "outfit-bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Let's Create New Account
      </Text>

      <View
        style={{
          marginTop: 45,
        }}
      >
        {/* Name */}
        <Text
          style={{
            fontFamily: "outfit-bold",
            padding: 5,
          }}
        >
          Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="example"
          onChangeText={(value) => setName(value)}
        ></TextInput>

        {/* Email */}
        <Text
          style={{
            fontFamily: "outfit-bold",
            marginTop: 20,
            padding: 5,
          }}
        >
          Email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          onChangeText={(value) => setEmail(value)}
        ></TextInput>

        {/* Password */}
        <Text
          style={{
            fontFamily: "outfit-bold",
            marginTop: 20,
            padding: 5,
          }}
        >
          Password
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="* * * * * * * * * *"
          onChangeText={(value) => setPassword(value)}
        ></TextInput>
      </View>

      <TouchableOpacity
        onPress={OnCreateAccount}
        style={{
          marginTop: 40,
          padding: 23,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 99,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "outfit-medium",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        // onPress={() => router.replace("")}
        style={{
          marginTop: 20,
          padding: 17,
          borderRadius: 99,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GoogleIcon
          name="logo-google"
          size={20}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontFamily: "outfit-medium",
          }}
        >
          Continue with GOOGLE
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.GREY,
    fontFamily: "outfit",
  },
});
